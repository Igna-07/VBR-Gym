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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const util_1 = require("util");
const prisma_service_1 = require("../prisma.service");
const scrypt = (0, util_1.promisify)(crypto_1.scrypt);
let AuthService = class AuthService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async status() { return { hasAdmin: (await this.prisma.adminUser.count()) > 0 }; }
    async setup(data, response) {
        if (await this.prisma.adminUser.count())
            throw new common_1.BadRequestException('El administrador ya fue creado.');
        const email = data.email.trim().toLowerCase();
        const salt = (0, crypto_1.randomBytes)(16).toString('hex');
        const passwordHash = (await scrypt(data.password, salt, 64)).toString('hex');
        const user = await this.prisma.adminUser.create({ data: { email, passwordSalt: salt, passwordHash } });
        await this.createSession(user.id, response);
        return { id: user.id, email: user.email };
    }
    async login(data, response) {
        const user = await this.prisma.adminUser.findUnique({ where: { email: data.email.trim().toLowerCase() } });
        if (!user)
            throw new common_1.UnauthorizedException('Correo o contraseña incorrectos.');
        const candidate = await scrypt(data.password, user.passwordSalt, 64);
        const expected = Buffer.from(user.passwordHash, 'hex');
        if (candidate.length !== expected.length || !(0, crypto_1.timingSafeEqual)(candidate, expected))
            throw new common_1.UnauthorizedException('Correo o contraseña incorrectos.');
        await this.createSession(user.id, response);
        return { id: user.id, email: user.email };
    }
    async logout(token, response) {
        if (token)
            await this.prisma.authSession.deleteMany({ where: { tokenHash: (0, crypto_1.createHash)('sha256').update(token).digest('hex') } });
        response.clearCookie('vbr_session', { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/' });
        return { success: true };
    }
    async createSession(userId, response) {
        const token = (0, crypto_1.randomBytes)(32).toString('hex');
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        await this.prisma.authSession.create({ data: { userId, tokenHash: (0, crypto_1.createHash)('sha256').update(token).digest('hex'), expiresAt } });
        response.cookie('vbr_session', token, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 7 * 24 * 60 * 60 * 1000, path: '/' });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map