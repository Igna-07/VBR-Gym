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
exports.MembersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let MembersService = class MembersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll() {
        return this.prisma.member.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async create(data) {
        const isPromoted = data.plan === 'Plan libre';
        const dueDate = isPromoted ? null : new Date(`${data.dueDate}T12:00:00.000Z`);
        try {
            return await this.prisma.member.create({
                data: {
                    name: data.name,
                    phone: data.phone,
                    email: data.email || null,
                    plan: data.plan,
                    dueDate,
                    whatsappAllowed: data.whatsappAllowed,
                    attendanceFrequency: data.attendanceFrequency,
                    attendanceDays: data.attendanceDays,
                    scheduleGroupId: data.scheduleGroupId || null,
                    payments: {
                        create: { dueDate, status: isPromoted ? 'EXEMPT' : 'PENDING' },
                    },
                },
            });
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new common_1.ConflictException('Ya existe un socio con ese teléfono o correo electrónico.');
            }
            throw error;
        }
    }
    async remove(id) {
        try {
            return await this.prisma.member.delete({ where: { id } });
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.NotFoundException('El socio no existe.');
            }
            throw error;
        }
    }
};
exports.MembersService = MembersService;
exports.MembersService = MembersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MembersService);
//# sourceMappingURL=members.service.js.map