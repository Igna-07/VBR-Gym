import { CreateScheduleGroupDto } from './dto/create-schedule-group.dto';
import { ScheduleGroupsService } from './schedule-groups.service';
export declare class ScheduleGroupsController {
    private readonly scheduleGroupsService;
    constructor(scheduleGroupsService: ScheduleGroupsService);
    findAll(): import("../generated/prisma/internal/prismaNamespace").PrismaPromise<({
        members: {
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
        }[];
    } & {
        active: boolean;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        startTime: string;
        endTime: string;
        capacity: number;
    })[]>;
    create(data: CreateScheduleGroupDto): import("../generated/prisma/models").Prisma__ScheduleGroupClient<{
        members: {
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
        }[];
    } & {
        active: boolean;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        startTime: string;
        endTime: string;
        capacity: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    addMember(groupId: string, memberId: string, day: string): Promise<({
        members: {
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
        }[];
    } & {
        active: boolean;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        startTime: string;
        endTime: string;
        capacity: number;
    }) | null>;
    removeMember(groupId: string, memberId: string): import("../generated/prisma/internal/prismaNamespace").PrismaPromise<import("../generated/prisma/internal/prismaNamespace").BatchPayload>;
    remove(id: string): Promise<{
        active: boolean;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        startTime: string;
        endTime: string;
        capacity: number;
    }>;
}
