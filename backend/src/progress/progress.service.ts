import {
  Injectable,
  NotFoundException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class ProgressService {
  private readonly logger = new Logger(ProgressService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly email: EmailService,
  ) {}

  // ─── Enrollment ────────────────────────────────────────────────────────────

  async enroll(studentId: string, courseId: string) {
    const course = await this.prisma.course.findUnique({ where: { id: courseId } });
    if (!course) throw new NotFoundException('Course not found');

    const existing = await this.prisma.studentProgress.findUnique({
      where: { studentId_courseId: { studentId, courseId } },
    });
    if (existing) throw new ConflictException('Already enrolled in this course');

    return this.prisma.studentProgress.create({
      data: { studentId, courseId },
    });
  }

  // ─── Student: get own progress ─────────────────────────────────────────────

  async getMyProgress(studentId: string, courseId: string) {
    const progress = await this.prisma.studentProgress.findUnique({
      where: { studentId_courseId: { studentId, courseId } },
      include: {
        course: {
          include: {
            modules: { orderBy: { moduleNumber: 'asc' } },
          },
        },
      },
    });
    if (!progress) throw new NotFoundException('Not enrolled in this course');
    return this.formatProgress(progress);
  }

  async getAllMyProgress(studentId: string) {
    const records = await this.prisma.studentProgress.findMany({
      where: { studentId },
      include: {
        course: {
          include: {
            modules: { orderBy: { moduleNumber: 'asc' } },
          },
        },
      },
      orderBy: { enrollmentDate: 'desc' },
    });
    return records.map((r) => this.formatProgress(r));
  }

  // ─── Admin: mark a module complete + recalculate all enrolled students ──────

  async markModuleComplete(courseId: string, moduleId: string) {
    const mod = await this.prisma.module.findFirst({ where: { id: moduleId, courseId } });
    if (!mod) throw new NotFoundException('Module not found in course');

    if (mod.completed) {
      return { message: 'Module already marked as completed', moduleId };
    }

    // Mark the module as done
    await this.prisma.module.update({
      where: { id: moduleId },
      data: { completed: true, completionDate: new Date() },
    });

    // Get all modules for the course to recalculate %
    const allModules = await this.prisma.module.findMany({ where: { courseId } });
    const completedCount = allModules.filter((m) => m.completed || m.id === moduleId).length;
    const newPercentage = allModules.length > 0
      ? (completedCount / allModules.length) * 100
      : 0;

    // Update all enrolled students' progress
    const enrolledStudents = await this.prisma.studentProgress.findMany({
      where: { courseId },
      include: { student: { select: { id: true, email: true, name: true } } },
    });

    for (const sp of enrolledStudents) {
      const updatedModulesCompleted = Array.from(
        new Set([...sp.modulesCompleted, moduleId])
      );
      await this.prisma.studentProgress.update({
        where: { id: sp.id },
        data: {
          modulesCompleted: updatedModulesCompleted,
          completionPercentage: newPercentage,
          lastActivityDate: new Date(),
        },
      });

      // Send email notification
      try {
        await this.email.sendModuleCompletionNotification(
          sp.student.email,
          sp.student.name,
          mod.title,
          newPercentage,
        );
      } catch (err) {
        this.logger.error(
          `Failed to send module completion email to ${sp.student.email}: ${String(err)}`,
        );
      }
    }

    this.logger.log(
      `Module "${mod.title}" (${moduleId}) marked complete. ${enrolledStudents.length} students notified.`,
    );

    return {
      moduleId,
      moduleName: mod.title,
      newPercentage,
      studentsNotified: enrolledStudents.length,
    };
  }

  // ─── Admin: all students with progress for a course ────────────────────────

  async getStudentsProgress(courseId: string) {
    const course = await this.prisma.course.findUnique({ where: { id: courseId } });
    if (!course) throw new NotFoundException('Course not found');

    const records = await this.prisma.studentProgress.findMany({
      where: { courseId },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
            paymentStatus: true,
            lastActivityDate: true,
          },
        },
      },
      orderBy: { completionPercentage: 'desc' },
    });

    return records.map((r) => ({
      studentId: r.studentId,
      name: r.student.name,
      email: r.student.email,
      paymentStatus: r.student.paymentStatus,
      enrollmentDate: r.enrollmentDate,
      completionPercentage: r.completionPercentage,
      modulesCompleted: r.modulesCompleted.length,
      streakDays: r.streakDays,
      lastActivityDate: r.lastActivityDate,
    }));
  }

  // ─── Admin: enriched student list for dashboard ────────────────────────────

  async getAllStudentsForDashboard() {
    const students = await this.prisma.user.findMany({
      where: { role: 'STUDENT' },
      select: {
        id: true,
        name: true,
        email: true,
        paymentStatus: true,
        studentProgress: {
          select: {
            completionPercentage: true,
            streakDays: true,
            lastActivityDate: true,
            modulesCompleted: true,
            course: {
              select: {
                modules: {
                  orderBy: { moduleNumber: 'asc' },
                  select: { id: true, title: true },
                },
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return students.map((s) => {
      const p = s.studentProgress;
      const avgCompletion =
        p.length
          ? p.reduce((a, x) => a + x.completionPercentage, 0) / p.length
          : 0;
      const streakDays =
        p.length ? Math.max(...p.map((x) => x.streakDays)) : 0;
      const lastActive =
        p.length
          ? p
              .map((x) => x.lastActivityDate)
              .sort((a, b) => b.getTime() - a.getTime())[0]
          : null;

      let currentModule = 'Not enrolled';
      for (const sp of p) {
        const first = sp.course.modules.find(
          (m) => !sp.modulesCompleted.includes(m.id),
        );
        if (first) {
          currentModule = first.title;
          break;
        }
      }

      return {
        id: s.id,
        name: s.name,
        email: s.email,
        paymentStatus: s.paymentStatus,
        avgCompletion,
        streakDays,
        currentModule,
        lastActive,
      };
    });
  }

  // ─── Admin: all students (platform-wide) ───────────────────────────────────

  async getAllStudents() {
    const students = await this.prisma.user.findMany({
      where: { role: 'STUDENT' },
      select: {
        id: true,
        name: true,
        email: true,
        paymentStatus: true,
        paymentDate: true,
        enrollmentDate: true,
        createdAt: true,
        studentProgress: {
          select: {
            courseId: true,
            completionPercentage: true,
            lastActivityDate: true,
            streakDays: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return students.map((s) => ({
      id: s.id,
      name: s.name,
      email: s.email,
      paymentStatus: s.paymentStatus,
      paymentDate: s.paymentDate,
      enrollmentDate: s.enrollmentDate,
      joinedAt: s.createdAt,
      coursesEnrolled: s.studentProgress.length,
      avgCompletion:
        s.studentProgress.length > 0
          ? s.studentProgress.reduce((sum, p) => sum + p.completionPercentage, 0) /
            s.studentProgress.length
          : 0,
      lastActive:
        s.studentProgress.length > 0
          ? s.studentProgress
              .map((p) => p.lastActivityDate)
              .sort((a, b) => b.getTime() - a.getTime())[0]
          : null,
    }));
  }

  // ─── Admin: single student detail ─────────────────────────────────────────

  async getStudentDetail(studentId: string) {
    const student = await this.prisma.user.findUnique({
      where: { id: studentId, role: 'STUDENT' },
      select: {
        id: true,
        name: true,
        email: true,
        paymentStatus: true,
        paymentDate: true,
        enrollmentDate: true,
        createdAt: true,
        studentProgress: {
          include: {
            course: {
              include: {
                modules: { orderBy: { moduleNumber: 'asc' } },
              },
            },
          },
        },
      },
    });
    if (!student) throw new NotFoundException('Student not found');

    return {
      id: student.id,
      name: student.name,
      email: student.email,
      paymentStatus: student.paymentStatus,
      paymentDate: student.paymentDate,
      enrollmentDate: student.enrollmentDate,
      joinedAt: student.createdAt,
      progress: student.studentProgress.map((sp) => this.formatProgress(sp)),
    };
  }

  // ─── CSV export ────────────────────────────────────────────────────────────

  async exportStudentsCsv(): Promise<string> {
    const students = await this.getAllStudents();

    const headers = [
      'Name',
      'Email',
      'Payment Status',
      'Payment Date',
      'Joined',
      'Courses Enrolled',
      'Avg Completion %',
      'Last Active',
    ];

    const rows = students.map((s) => [
      s.name,
      s.email,
      s.paymentStatus ? 'Paid' : 'Unpaid',
      s.paymentDate ? new Date(s.paymentDate).toLocaleDateString('en-IN') : '',
      new Date(s.joinedAt).toLocaleDateString('en-IN'),
      String(s.coursesEnrolled),
      s.avgCompletion.toFixed(1),
      s.lastActive ? new Date(s.lastActive).toLocaleDateString('en-IN') : 'Never',
    ]);

    const escape = (val: string) =>
      `"${val.replace(/"/g, '""')}"`;

    const csvLines = [
      headers.map(escape).join(','),
      ...rows.map((row) => row.map(escape).join(',')),
    ];

    return csvLines.join('\n');
  }

  // ─── Helper ────────────────────────────────────────────────────────────────

  private formatProgress(sp: {
    id: string;
    studentId: string;
    courseId: string;
    enrollmentDate: Date;
    completionPercentage: number;
    modulesCompleted: string[];
    lastActivityDate: Date;
    streakDays: number;
    course: {
      id: string;
      courseName: string;
      totalModules: number;
      modules: {
        id: string;
        moduleNumber: number;
        title: string;
        description: string;
        completed: boolean;
        completionDate: Date | null;
        estimatedHours: number;
      }[];
    };
  }) {
    const modules = sp.course.modules.map((m) => ({
      id: m.id,
      moduleNumber: m.moduleNumber,
      title: m.title,
      description: m.description,
      estimatedHours: m.estimatedHours,
      completed: m.completed,
      completionDate: m.completionDate,
      studentCompleted: sp.modulesCompleted.includes(m.id),
    }));

    return {
      courseId: sp.courseId,
      courseName: sp.course.courseName,
      totalModules: sp.course.totalModules,
      enrollmentDate: sp.enrollmentDate,
      completionPercentage: sp.completionPercentage,
      modulesCompleted: sp.modulesCompleted.length,
      streakDays: sp.streakDays,
      lastActivityDate: sp.lastActivityDate,
      modules,
    };
  }
}
