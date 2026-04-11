import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: signupDto.email },
    });
    
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(signupDto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: signupDto.email,
        password: hashedPassword,
        name: signupDto.name,
      },
    });

    const token = this.jwtService.sign({ sub: user.id, email: user.email });

    return {
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({ sub: user.id, email: user.email });

    return {
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }
}