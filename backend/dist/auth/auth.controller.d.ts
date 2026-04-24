import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
    logout(req: Request, res: Response): Promise<{
        message: string;
    }>;
    me(req: Request): Promise<{
        name: string;
        id: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        paymentStatus: boolean;
        enrollmentDate: Date;
        createdAt: Date;
    }>;
    private setTokenCookies;
}
