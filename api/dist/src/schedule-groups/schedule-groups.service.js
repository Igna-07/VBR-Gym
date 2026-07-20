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
exports.ScheduleGroupsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ScheduleGroupsService = class ScheduleGroupsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll() {
        return this.prisma.scheduleGroup.findMany({
            where: { active: true },
            include: {
                members: { orderBy: { name: 'asc' } },
            },
            orderBy: { startTime: 'asc' },
        });
    }
    create(data) {
        return this.prisma.scheduleGroup.create({
            data,
            include: { members: true },
        });
    }
    async addMember(groupId, memberId, day) {
        const validDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        if (!validDays.includes(day))
            throw new common_1.BadRequestException('El día seleccionado no es válido.');
        const group = await this.prisma.scheduleGroup.findUnique({
            where: { id: groupId },
            include: { members: { where: { attendanceDays: { has: day } }, select: { id: true } } },
        });
        if (!group)
            throw new common_1.NotFoundException('El turno no existe.');
        if (group.members.length >= group.capacity)
            throw new common_1.BadRequestException(`El turno del ${day.toLowerCase()} ya alcanzó su cupo.`);
        const member = await this.prisma.member.findUnique({ where: { id: memberId }, select: { attendanceDays: true } });
        if (!member)
            throw new common_1.NotFoundException('El socio no existe.');
        if (!member.attendanceDays.includes(day))
            throw new common_1.BadRequestException(`El socio no tiene ${day.toLowerCase()} entre sus días de asistencia.`);
        await this.prisma.member.update({ where: { id: memberId }, data: { scheduleGroupId: groupId } });
        return this.prisma.scheduleGroup.findUnique({
            where: { id: groupId },
            include: { members: { orderBy: { name: 'asc' } } },
        });
    }
    removeMember(groupId, memberId) {
        return this.prisma.member.updateMany({
            where: { id: memberId, scheduleGroupId: groupId },
            data: { scheduleGroupId: null },
        });
    }
    async remove(id) {
        const group = await this.prisma.scheduleGroup.findUnique({ where: { id } });
        if (!group)
            throw new common_1.NotFoundException('El turno no existe.');
        return this.prisma.$transaction(async (tx) => {
            await tx.member.updateMany({ where: { scheduleGroupId: id }, data: { scheduleGroupId: null } });
            return tx.scheduleGroup.update({ where: { id }, data: { active: false } });
        });
    }
};
exports.ScheduleGroupsService = ScheduleGroupsService;
exports.ScheduleGroupsService = ScheduleGroupsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ScheduleGroupsService);
//# sourceMappingURL=schedule-groups.service.js.map