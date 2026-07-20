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
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const whatsapp_service_1 = require("./whatsapp.service");
let PaymentsService = class PaymentsService {
    prisma;
    whatsapp;
    reminderTimer;
    constructor(prisma, whatsapp) {
        this.prisma = prisma;
        this.whatsapp = whatsapp;
    }
    onModuleInit() {
        this.reminderTimer = setInterval(() => void this.processDueReminders(), 60 * 60 * 1000);
        setTimeout(() => void this.processDueReminders(), 5000);
    }
    onModuleDestroy() { if (this.reminderTimer)
        clearInterval(this.reminderTimer); }
    async findAll() {
        const endOfToday = new Date();
        endOfToday.setHours(23, 59, 59, 999);
        await this.prisma.payment.updateMany({ where: { dueDate: { lte: endOfToday }, status: { in: ['PENDING', 'PAID'] } }, data: { status: 'OVERDUE' } });
        return this.prisma.payment.findMany({
            include: { member: { include: { scheduleGroup: true } } },
            orderBy: { member: { name: 'asc' } },
        });
    }
    whatsappStatus() { return { configured: this.whatsapp.isConfigured(), senderNumber: this.whatsapp.senderNumber() }; }
    async markPaid(id) {
        const payment = await this.prisma.payment.findUnique({ where: { id } });
        if (!payment)
            throw new common_1.NotFoundException('El pago no existe.');
        const year = payment.dueDate.getUTCFullYear();
        const month = payment.dueDate.getUTCMonth();
        const originalDay = payment.dueDate.getUTCDate();
        const lastDayNextMonth = new Date(Date.UTC(year, month + 2, 0)).getUTCDate();
        const nextDueDate = new Date(Date.UTC(year, month + 1, Math.min(originalDay, lastDayNextMonth), 12));
        return this.prisma.$transaction(async (tx) => {
            const updatedPayment = await tx.payment.update({
                where: { id },
                data: {
                    dueDate: nextDueDate,
                    status: 'PAID',
                    paidAt: new Date(),
                    reminderSentAt: null,
                    whatsappMessageId: null,
                    reminderError: null,
                },
                include: { member: true },
            });
            await tx.member.update({ where: { id: payment.memberId }, data: { dueDate: nextDueDate } });
            return updatedPayment;
        });
    }
    async sendReminder(id) {
        const payment = await this.prisma.payment.findUnique({ where: { id }, include: { member: true } });
        if (!payment)
            throw new common_1.NotFoundException('El pago no existe.');
        if (!payment.member.whatsappAllowed)
            throw new common_1.BadRequestException('El socio no autorizó mensajes por WhatsApp.');
        const endOfToday = new Date();
        endOfToday.setHours(23, 59, 59, 999);
        if (payment.dueDate > endOfToday)
            throw new common_1.BadRequestException('El aviso se habilita el día del vencimiento.');
        try {
            const messageId = await this.whatsapp.sendPaymentReminder(payment.member.phone, payment.member.name, payment.dueDate);
            return await this.prisma.payment.update({ where: { id }, data: { reminderSentAt: new Date(), whatsappMessageId: messageId, reminderError: null }, include: { member: true } });
        }
        catch (error) {
            await this.prisma.payment.update({ where: { id }, data: { reminderError: error instanceof Error ? error.message : 'No se pudo enviar.' } });
            throw error;
        }
    }
    async processDueReminders() {
        if (!this.whatsapp.isConfigured())
            return;
        const now = new Date();
        const argentinaHour = Number(new Intl.DateTimeFormat('en-US', {
            timeZone: 'America/Argentina/Buenos_Aires', hour: '2-digit', hour12: false,
        }).format(now));
        if (argentinaHour < 9)
            return;
        const endOfToday = new Date(now);
        endOfToday.setUTCHours(23, 59, 59, 999);
        await this.prisma.payment.updateMany({
            where: { dueDate: { lte: endOfToday }, status: { in: ['PENDING', 'PAID'] } },
            data: { status: 'OVERDUE' },
        });
        const duePayments = await this.prisma.payment.findMany({
            where: { dueDate: { lte: endOfToday }, status: { in: ['PENDING', 'OVERDUE'] }, reminderSentAt: null, member: { whatsappAllowed: true } },
            select: { id: true },
        });
        for (const payment of duePayments) {
            try {
                await this.sendReminder(payment.id);
            }
            catch { }
        }
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, whatsapp_service_1.WhatsappService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map