import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
// ClassStatus mirrors the Prisma enum — defined here to avoid requiring prisma generate before compile
const ClassStatus = {
  SCHEDULED: 'SCHEDULED',
  LIVE: 'LIVE',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
} as const;
type ClassStatus = (typeof ClassStatus)[keyof typeof ClassStatus];

@Injectable()
export class ClassesService {
  private readonly logger = new Logger(ClassesService.name);
  private readonly encKey: Buffer;

  constructor(
    private readonly prisma: PrismaService,
    private readonly email: EmailService,
    private readonly config: ConfigService,
  ) {
    const rawKey = this.config.get<string>('MEET_LINK_ENC_KEY') ?? '';
    if (!rawKey || rawKey.length < 32) {
      this.logger.warn('MEET_LINK_ENC_KEY is not set or too short — Meet links will not be encrypted properly');
    }
    // Use SHA-256 of the key to always get 32 bytes regardless of input length
    this.encKey = crypto.createHash('sha256').update(rawKey).digest();
  }

  // ─── Encryption Helpers ────────────────────────────────────────────────────

  private encrypt(plaintext: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', this.encKey, iv);
    const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
  }

  private decrypt(ciphertext: string): string {
    const [ivHex, encHex] = ciphertext.split(':');
    if (!ivHex || !encHex) return '';
    const iv = Buffer.from(ivHex, 'hex');
    const enc = Buffer.from(encHex, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', this.encKey, iv);
    const decrypted = Buffer.concat([decipher.update(enc), decipher.final()]);
    return decrypted.toString('utf8');
  }

  // ─── Admin: CRUD ───────────────────────────────────────────────────────────

  async create(dto: CreateClassDto) {
    const course = await this.prisma.course.findUnique({ where: { id: dto.courseId } });
    if (!course) throw new NotFoundException('Course not found');

    const meetLinkEnc = dto.meetLink ? this.encrypt(dto.meetLink) : null;

    const cls = await this.prisma.class.create({
      data: {
        courseId: dto.courseId,
        moduleId: dto.moduleId ?? null,
        topic: dto.topic,
        date: new Date(dto.date),
        startTime: new Date(dto.startTime),
        endTime: new Date(dto.endTime),
        meetLinkEnc,
        recordingLink: dto.recordingLink ?? null,
        status: dto.status ?? ClassStatus.SCHEDULED,
      },
    });

    return this.sanitizeForAdmin(cls);
  }

  async findAll(courseId?: string) {
    const classes = await this.prisma.class.findMany({
      where: courseId ? { courseId } : undefined,
      orderBy: { startTime: 'asc' },
      include: { course: { select: { courseName: true } }, module: { select: { title: true } } },
    });
    return classes.map((c) => this.sanitizeForAdmin(c));
  }

  async findOne(id: string) {
    const cls = await this.prisma.class.findUnique({
      where: { id },
      include: { course: { select: { courseName: true } }, module: { select: { title: true } } },
    });
    if (!cls) throw new NotFoundException('Class not found');
    return this.sanitizeForAdmin(cls);
  }

  async update(id: string, dto: UpdateClassDto) {
    const cls = await this.prisma.class.findUnique({ where: { id } });
    if (!cls) throw new NotFoundException('Class not found');

    const data: Record<string, unknown> = { ...dto };
    delete data['meetLink'];

    if (dto.meetLink !== undefined) {
      data['meetLinkEnc'] = dto.meetLink ? this.encrypt(dto.meetLink) : null;
    }
    if (dto.date) data['date'] = new Date(dto.date);
    if (dto.startTime) data['startTime'] = new Date(dto.startTime);
    if (dto.endTime) data['endTime'] = new Date(dto.endTime);

    const updated = await this.prisma.class.update({ where: { id }, data });
    return this.sanitizeForAdmin(updated);
  }

  async remove(id: string) {
    const cls = await this.prisma.class.findUnique({ where: { id } });
    if (!cls) throw new NotFoundException('Class not found');
    await this.prisma.class.delete({ where: { id } });
  }

  // ─── Student: read-only ────────────────────────────────────────────────────

  async findForStudent(studentId: string, courseId?: string) {
    // Check if student has paid
    const student = await this.prisma.user.findUnique({
      where: { id: studentId },
      select: { paymentStatus: true },
    });
    const hasPaid = student?.paymentStatus ?? false;

    const classes = await this.prisma.class.findMany({
      where: courseId ? { courseId } : undefined,
      orderBy: { startTime: 'asc' },
      include: { course: { select: { courseName: true } }, module: { select: { title: true } } },
    });

    return classes.map((c) => this.sanitizeForStudent(c, hasPaid));
  }

  async getMeetLink(classId: string, studentId: string): Promise<string> {
    const student = await this.prisma.user.findUnique({
      where: { id: studentId },
      select: { paymentStatus: true },
    });
    if (!student?.paymentStatus) {
      throw new ForbiddenException('Payment required to access Meet link');
    }

    const cls = await this.prisma.class.findUnique({ where: { id: classId } });
    if (!cls) throw new NotFoundException('Class not found');
    if (!cls.meetLinkEnc) throw new NotFoundException('Meet link not set for this class');

    return this.decrypt(cls.meetLinkEnc);
  }

  // ─── Cron: reminder emails 15 min before class ─────────────────────────────

  @Cron(CronExpression.EVERY_MINUTE)
  async sendReminders() {
    const now = new Date();
    const windowStart = new Date(now.getTime() + 14 * 60 * 1000); // 14 min from now
    const windowEnd = new Date(now.getTime() + 16 * 60 * 1000);   // 16 min from now

    const upcoming = await this.prisma.class.findMany({
      where: {
        startTime: { gte: windowStart, lte: windowEnd },
        status: ClassStatus.SCHEDULED,
        reminderSentAt: null,
        meetLinkEnc: { not: null },
      },
    });

    for (const cls of upcoming) {
      await this.sendReminderForClass(cls);
    }
  }

  private async sendReminderForClass(cls: {
    id: string;
    topic: string;
    startTime: Date;
    meetLinkEnc: string | null;
    courseId: string;
  }) {
    if (!cls.meetLinkEnc) return;

    const meetLink = this.decrypt(cls.meetLinkEnc);
    const paidStudents = await this.prisma.user.findMany({
      where: { paymentStatus: true },
      select: { id: true, email: true, name: true },
    });

    for (const student of paidStudents) {
      try {
        await this.email.sendClassReminder(student.email, student.name, cls.topic, meetLink, cls.startTime);
      } catch (err) {
        this.logger.error(`Failed to send reminder to ${student.email}: ${String(err)}`);
      }
    }

    await this.prisma.class.update({
      where: { id: cls.id },
      data: { reminderSentAt: new Date() },
    });

    this.logger.log(`Sent reminders for class: ${cls.topic} (${cls.id})`);
  }

  // ─── Sanitizers ────────────────────────────────────────────────────────────

  private sanitizeForAdmin(cls: Record<string, unknown>) {
    const { meetLinkEnc, ...rest } = cls;
    return {
      ...rest,
      meetLink: meetLinkEnc ? this.decrypt(meetLinkEnc as string) : null,
    };
  }

  private sanitizeForStudent(cls: Record<string, unknown>, hasPaid: boolean) {
    const { meetLinkEnc, ...rest } = cls;
    return {
      ...rest,
      meetLink: null, // never sent in list — student must call /meet-link endpoint
      hasMeetLink: !!meetLinkEnc,
      meetLinkAccessible: hasPaid && !!meetLinkEnc,
    };
  }
}
