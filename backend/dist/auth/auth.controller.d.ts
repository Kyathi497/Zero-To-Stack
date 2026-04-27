import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
export declare class AuthController {
    private readonly authService;
    private readonly configService;
    constructor(authService: AuthService, configService: ConfigService);
    signup(dto: SignupDto, res: Response): Promise<{
        user: {
            name: string;
            id: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
            paymentStatus: boolean;
        };
    }>;
    login(dto: LoginDto, res: Response): Promise<{
        user: {
            name: string;
            id: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
            paymentStatus: boolean;
        };
    }>;
    refresh(req: Request, res: Response): Promise<Response<any, Record<string, any>> | {
        user: {
            name: string;
            id: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
            paymentStatus: boolean;
        };
    }>;
    logout(res: Response): {
        message: string;
    };
    me(req: Request): Promise<{
        name: string;
        id: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        paymentStatus: boolean;
        enrollmentDate: Date;
        createdAt: Date;
    }>;
    createAdmin(dto: CreateAdminDto, adminSecret: string | undefined, req: Request): Promise<{
        name: string;
        id: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
    }>;
    private setTokenCookies;
}
