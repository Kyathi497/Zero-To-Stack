import {
  Controller,
  Post,
  Get,
  Body,
  Req,
  Res,
  HttpCode,
  HttpStatus,
  UseGuards,
  Headers,
  ForbiddenException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AdminGuard } from './guards/admin.guard';

const COOKIE_OPTS_BASE = {
  httpOnly: true,
  sameSite: 'lax' as const,
  path: '/',
};

const isProd = process.env.NODE_ENV === 'production';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() dto: SignupDto, @Res({ passthrough: true }) res: Response) {
    const { user, tokens } = await this.authService.signup(dto);
    this.setTokenCookies(res, tokens.accessToken, tokens.refreshToken);
    return { user };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const { user, tokens } = await this.authService.login(dto);
    this.setTokenCookies(res, tokens.accessToken, tokens.refreshToken);
    return { user };
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const oldToken: string = req.cookies?.refresh_token;
    if (!oldToken) {
      res.clearCookie('access_token');
      res.clearCookie('refresh_token');
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        data: null,
        error: { code: 'NO_REFRESH_TOKEN', message: 'No refresh token provided' },
      });
    }
    const { user, tokens } = await this.authService.refresh(oldToken);
    this.setTokenCookies(res, tokens.accessToken, tokens.refreshToken);
    return { user };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token', { path: '/' });
    res.clearCookie('refresh_token', { path: '/' });
    return { message: 'Logged out' };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@Req() req: Request) {
    const user = req.user as { id: string };
    return this.authService.me(user.id);
  }

  @Post('admin')
  @HttpCode(HttpStatus.CREATED)
  async createAdmin(
    @Body() dto: CreateAdminDto,
    @Headers('x-admin-secret') adminSecret: string | undefined,
    @Req() req: Request,
  ) {
    const hasAdminJwt =
      req.cookies?.access_token &&
      (req.user as { role: string } | undefined)?.role === 'ADMIN';
    const validSecret =
      adminSecret === this.configService.get<string>('ADMIN_SECRET');

    if (!hasAdminJwt && !validSecret) {
      throw new ForbiddenException('Admin access required');
    }

    return this.authService.createAdmin(dto);
  }

  // ─── Helpers ────────────────────────────────────────────────────────────────

  private setTokenCookies(res: Response, accessToken: string, refreshToken: string) {
    res.cookie('access_token', accessToken, {
      ...COOKIE_OPTS_BASE,
      secure: isProd,
      maxAge: 15 * 60 * 1000, // 15 minutes
    });
    res.cookie('refresh_token', refreshToken, {
      ...COOKIE_OPTS_BASE,
      secure: isProd,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
  }
}
