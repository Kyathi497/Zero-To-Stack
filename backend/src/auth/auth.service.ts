import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  // ─── Public Methods ─────────────────────────────────────────────────────────

  async signup(dto: SignupDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) throw new ConflictException('Email already registered');

    const passwordHash = await bcrypt.hash(dto.password, 12);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        phone: dto.phone,
        passwordHash,
      },
      select: { id: true, email: true, name: true, role: true, paymentStatus: true },
    });

    const tokens = await this.generateTokens(user.id, user.email, user.role);
    return { user, tokens };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        paymentStatus: true,
        passwordHash: true,
      },
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    const { passwordHash: _, ...safeUser } = user;
    const tokens = await this.generateTokens(user.id, user.email, user.role);
    return { user: safeUser, tokens };
  }

  async refresh(oldRefreshToken: string) {
    const record = await this.prisma.refreshToken.findUnique({
      where: { token: oldRefreshToken },
    });

    if (!record || record.revoked || record.expiresAt < new Date()) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    // Revoke the old token (rotation)
    await this.prisma.refreshToken.update({
      where: { id: record.id },
      data: { revoked: true },
    });

    const user = await this.prisma.user.findUnique({
      where: { id: record.userId },
      select: { id: true, email: true, name: true, role: true, paymentStatus: true },
    });
    if (!user) throw new UnauthorizedException('User not found');

    const tokens = await this.generateTokens(user.id, user.email, user.role);
    return { user, tokens };
  }

  async logout(refreshToken: string) {
    await this.prisma.refreshToken.updateMany({
      where: { token: refreshToken, revoked: false },
      data: { revoked: true },
    });
  }

  async me(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        paymentStatus: true,
        enrollmentDate: true,
        createdAt: true,
      },
    });
    if (!user) throw new UnauthorizedException('User not found');
    return user;
  }

  // ─── Private Helpers ────────────────────────────────────────────────────────

  private async generateTokens(userId: string, email: string, role: string) {
    const accessToken = this.jwtService.sign(
      { sub: userId, email, role },
      {
        secret: this.config.get<string>('JWT_SECRET'),
        expiresIn: '15m',
      },
    );

    const refreshToken = crypto.randomBytes(40).toString('hex');
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.prisma.refreshToken.create({
      data: { userId, token: refreshToken, expiresAt },
    });

    return { accessToken, refreshToken };
  }
}
