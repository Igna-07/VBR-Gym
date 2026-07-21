import { PrismaService } from '../prisma.service';
import { CreateScheduleGroupDto } from './dto/create-schedule-group.dto';
export declare class ScheduleGroupsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): import("../generated/prisma/internal/prismaNamespace").PrismaPromise<({
        members: {
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
        }[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        startTime: string;
        endTime: string;
        capacity: number;
        active: boolean;
    })[]>;
    create(data: CreateScheduleGroupDto): import("../generated/prisma/models").Prisma__ScheduleGroupClient<{
        members: {
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
        }[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        startTime: string;
        endTime: string;
        capacity: number;
        active: boolean;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    addMember(groupId: string, memberId: string, day: string): Promise<({
        members: {
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
        }[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        startTime: string;
        endTime: string;
        capacity: number;
        active: boolean;
    }) | null>;
    removeMember(groupId: string, memberId: string): import("../generated/prisma/internal/prismaNamespace").PrismaPromise<import("../generated/prisma/internal/prismaNamespace").BatchPayload>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        startTime: string;
        endTime: string;
        capacity: number;
        active: boolean;
    }>;
}
