"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const auth_service_1 = require("./auth.service");
const signup_dto_1 = require("./dto/signup.dto");
const login_dto_1 = require("./dto/login.dto");
const create_admin_dto_1 = require("./dto/create-admin.dto");
const jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
const COOKIE_OPTS_BASE = {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
};
const isProd = process.env.NODE_ENV === 'production';
let AuthController = class AuthController {
    constructor(authService, configService) {
        this.authService = authService;
        this.configService = configService;
    }
    async signup(dto, res) {
        const { user, tokens } = await this.authService.signup(dto);
        this.setTokenCookies(res, tokens.accessToken, tokens.refreshToken);
        return { user };
    }
    async login(dto, res) {
        const { user, tokens } = await this.authService.login(dto);
        this.setTokenCookies(res, tokens.accessToken, tokens.refreshToken);
        return { user };
    }
    async refresh(req, res) {
        const oldToken = req.cookies?.refresh_token;
        if (!oldToken) {
            res.clearCookie('access_token');
            res.clearCookie('refresh_token');
            return res.status(common_1.HttpStatus.UNAUTHORIZED).json({
                success: false,
                data: null,
                error: { code: 'NO_REFRESH_TOKEN', message: 'No refresh token provided' },
            });
        }
        const { user, tokens } = await this.authService.refresh(oldToken);
        this.setTokenCookies(res, tokens.accessToken, tokens.refreshToken);
        return { user };
    }
    logout(res) {
        res.clearCookie('access_token', { path: '/' });
        res.clearCookie('refresh_token', { path: '/' });
        return { message: 'Logged out' };
    }
    async me(req) {
        const user = req.user;
        return this.authService.me(user.id);
    }
    async createAdmin(dto, adminSecret, req) {
        const hasAdminJwt = req.cookies?.access_token &&
            req.user?.role === 'ADMIN';
        const validSecret = adminSecret === this.configService.get('ADMIN_SECRET');
        if (!hasAdminJwt && !validSecret) {
            throw new common_1.ForbiddenException('Admin access required');
        }
        return this.authService.createAdmin(dto);
    }
    setTokenCookies(res, accessToken, refreshToken) {
        res.cookie('access_token', accessToken, {
            ...COOKIE_OPTS_BASE,
            secure: isProd,
            maxAge: 15 * 60 * 1000,
        });
        res.cookie('refresh_token', refreshToken, {
            ...COOKIE_OPTS_BASE,
            secure: isProd,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('signup'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_dto_1.SignupDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('refresh'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "me", null);
__decorate([
    (0, common_1.Post)('admin'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('x-admin-secret')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_admin_dto_1.CreateAdminDto, String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "createAdmin", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        config_1.ConfigService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map