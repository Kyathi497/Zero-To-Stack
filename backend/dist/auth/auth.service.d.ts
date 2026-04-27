import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    private readonly config;
    constructor(prisma: PrismaService, jwtService: JwtService, config: ConfigService);
    signup(dto: SignupDto): Promise<{
        user: {
            name: string;
            id: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
            paymentStatus: boolean;
        };
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
    }>;
    login(dto: LoginDto): Promise<{
        user: {
            name: string;
            id: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
            paymentStatus: boolean;
        };
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
    }>;
    refresh(oldRefreshToken: string): Promise<{
        user: {
            name: string;
            id: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
            paymentStatus: boolean;
        };
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
    }>;
    me(userId: string): Promise<{
        name: string;
        id: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        paymentStatus: boolean;
        enrollmentDate: Date;
        createdAt: Date;
    }>;
    createAdmin(dto: CreateAdminDto): Promise<{
        name: string;
        id: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
    }>;
    private generateTokens;
}
