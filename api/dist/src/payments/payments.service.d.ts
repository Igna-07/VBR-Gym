import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { WhatsappService } from './whatsapp.service';
export declare class PaymentsService implements OnModuleInit, OnModuleDestroy {
    private readonly prisma;
    private readonly whatsapp;
    private reminderTimer?;
    constructor(prisma: PrismaService, whatsapp: WhatsappService);
    onModuleInit(): void;
    onModuleDestroy(): void;
    findAll(): Promise<({
        member: {
            scheduleGroup: {
                active: boolean;
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                startTime: string;
                endTime: string;
                capacity: number;
            } | null;
        } & {
            status: import("../generated/prisma/enums").MemberStatus;
            name: string;
            phone: string;
            email: string | null;
            plan: string;
            dueDate: Date;
            whatsappAllowed: boolean;
            attendanceFrequency: import("../generated/prisma/enums").AttendanceFrequency;
            attendanceDays: string[];
            scheduleGroupId: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        status: import("../generated/prisma/enums").PaymentStatus;
        dueDate: Date;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        paidAt: Date | null;
        reminderSentAt: Date | null;
        whatsappMessageId: string | null;
        reminderError: string | null;
        memberId: string;
    })[]>;
    whatsappStatus(): {
        configured: boolean;
        senderNumber: string;
    };
    markPaid(id: string): Promise<{
        member: {
            status: import("../generated/prisma/enums").MemberStatus;
            name: string;
            phone: string;
            email: string | null;
            plan: string;
            dueDate: Date;
            whatsappAllowed: boolean;
            attendanceFrequency: import("../generated/prisma/enums").AttendanceFrequency;
            attendanceDays: string[];
            scheduleGroupId: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        status: import("../generated/prisma/enums").PaymentStatus;
        dueDate: Date;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        paidAt: Date | null;
        reminderSentAt: Date | null;
        whatsappMessageId: string | null;
        reminderError: string | null;
        memberId: string;
    }>;
    sendReminder(id: string): Promise<{
        member: {
            status: import("../generated/prisma/enums").MemberStatus;
            name: string;
            phone: string;
            email: string | null;
            plan: string;
            dueDate: Date;
            whatsappAllowed: boolean;
            attendanceFrequency: import("../generated/prisma/enums").AttendanceFrequency;
            attendanceDays: string[];
            scheduleGroupId: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        status: import("../generated/prisma/enums").PaymentStatus;
        dueDate: Date;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        paidAt: Date | null;
        reminderSentAt: Date | null;
        whatsappMessageId: string | null;
        reminderError: string | null;
        memberId: string;
    }>;
    private processDueReminders;
}
