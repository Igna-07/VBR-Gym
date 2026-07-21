import { PaymentsService } from './payments.service';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    findAll(): Promise<({
        member: {
            scheduleGroup: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                startTime: string;
                endTime: string;
                capacity: number;
                active: boolean;
            } | null;
        } & {
            id: string;
            name: string;
            phone: string;
            email: string | null;
            plan: string;
            dueDate: Date | null;
            whatsappAllowed: boolean;
            status: import("../generated/prisma/enums").MemberStatus;
            attendanceFrequency: import("../generated/prisma/enums").AttendanceFrequency;
            attendanceDays: string[];
            scheduleGroupId: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        dueDate: Date | null;
        status: import("../generated/prisma/enums").PaymentStatus;
        createdAt: Date;
        updatedAt: Date;
        memberId: string;
        paidAt: Date | null;
        reminderSentAt: Date | null;
        whatsappMessageId: string | null;
        reminderError: string | null;
    })[]>;
    whatsappStatus(): {
        configured: boolean;
        senderNumber: string;
    };
    markPaid(id: string): Promise<{
        member: {
            id: string;
            name: string;
            phone: string;
            email: string | null;
            plan: string;
            dueDate: Date | null;
            whatsappAllowed: boolean;
            status: import("../generated/prisma/enums").MemberStatus;
            attendanceFrequency: import("../generated/prisma/enums").AttendanceFrequency;
            attendanceDays: string[];
            scheduleGroupId: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        dueDate: Date | null;
        status: import("../generated/prisma/enums").PaymentStatus;
        createdAt: Date;
        updatedAt: Date;
        memberId: string;
        paidAt: Date | null;
        reminderSentAt: Date | null;
        whatsappMessageId: string | null;
        reminderError: string | null;
    }>;
    sendReminder(id: string): Promise<{
        member: {
            id: string;
            name: string;
            phone: string;
            email: string | null;
            plan: string;
            dueDate: Date | null;
            whatsappAllowed: boolean;
            status: import("../generated/prisma/enums").MemberStatus;
            attendanceFrequency: import("../generated/prisma/enums").AttendanceFrequency;
            attendanceDays: string[];
            scheduleGroupId: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        dueDate: Date | null;
        status: import("../generated/prisma/enums").PaymentStatus;
        createdAt: Date;
        updatedAt: Date;
        memberId: string;
        paidAt: Date | null;
        reminderSentAt: Date | null;
        whatsappMessageId: string | null;
        reminderError: string | null;
    }>;
}
