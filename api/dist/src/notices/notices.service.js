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
exports.NoticesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let NoticesService = class NoticesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        const payments = await this.prisma.payment.findMany({
            where: { status: { in: ['PENDING', 'OVERDUE'] }, dueDate: { not: null } },
            include: { member: { include: { scheduleGroup: true } } },
            orderBy: { dueDate: 'asc' },
        });
        const now = new Date();
        return payments.flatMap((payment) => {
            if (!payment.dueDate)
                return [];
            const daysOverdue = Math.floor((now.getTime() - payment.dueDate.getTime()) / 86400000);
            const base = {
                paymentId: payment.id,
                memberName: payment.member.name,
                phone: payment.member.phone,
                whatsappAllowed: payment.member.whatsappAllowed,
                dueDate: payment.dueDate,
                schedule: payment.member.scheduleGroup
                    ? `${payment.member.scheduleGroup.startTime} — ${payment.member.scheduleGroup.endTime}`
                    : 'Sin turno',
            };
            if (payment.reminderError)
                return [{ ...base, id: `failed-${payment.id}`, type: 'MESSAGE_FAILED', severity: 'HIGH', title: 'Mensaje fallido', detail: payment.reminderError }];
            if (daysOverdue >= 5)
                return [{ ...base, id: `long-${payment.id}`, type: 'LONG_OVERDUE', severity: 'HIGH', title: 'Pago atrasado hace varios días', detail: `${daysOverdue} días de atraso sin registrar el pago.` }];
            if (daysOverdue >= 0 && payment.member.whatsappAllowed && !payment.reminderSentAt)
                return [{ ...base, id: `pending-${payment.id}`, type: 'REMINDER_PENDING', severity: 'MEDIUM', title: 'Aviso automático pendiente', detail: 'La cuota venció y el recordatorio todavía no fue enviado.' }];
            return [];
        });
    }
};
exports.NoticesService = NoticesService;
exports.NoticesService = NoticesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NoticesService);
//# sourceMappingURL=notices.service.js.map