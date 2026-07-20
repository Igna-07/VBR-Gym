import { PaymentsService } from './payments.service';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
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
}
