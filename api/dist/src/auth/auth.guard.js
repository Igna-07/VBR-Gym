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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const crypto_1 = require("crypto");
const prisma_service_1 = require("../prisma.service");
const public_decorator_1 = require("./public.decorator");
let AuthGuard = class AuthGuard {
    reflector;
    prisma;
    constructor(reflector, prisma) {
        this.reflector = reflector;
        this.prisma = prisma;
    }
    async canActivate(context) {
        if (this.reflector.getAllAndOverride(public_decorator_1.IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]))
            return true;
        const request = context.switchToHttp().getRequest();
        const cookies = Object.fromEntries((request.headers.cookie || '').split(';').map((part) => part.trim().split('=').map(decodeURIComponent)).filter((pair) => pair.length === 2));
        const token = cookies.vbr_session;
        if (!token)
            throw new common_1.UnauthorizedException('Iniciá sesión para continuar.');
        const tokenHash = (0, crypto_1.createHash)('sha256').update(token).digest('hex');
        const session = await this.prisma.authSession.findUnique({ where: { tokenHash }, include: { user: true } });
        if (!session || session.expiresAt <= new Date()) {
            if (session)
                await this.prisma.authSession.delete({ where: { id: session.id } });
            throw new common_1.UnauthorizedException('La sesión venció. Iniciá sesión nuevamente.');
        }
        request.adminUser = { id: session.user.id, email: session.user.email };
        return true;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector, prisma_service_1.PrismaService])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map