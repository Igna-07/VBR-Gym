import { PrismaService } from '../prisma.service';
import { CreateMemberDto } from './dto/create-member.dto';
export declare class MembersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): import("../generated/prisma/internal/prismaNamespace").PrismaPromise<{
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
    }[]>;
    create(data: CreateMemberDto): Promise<{
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
    }>;
    remove(id: string): Promise<{
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
    }>;
}
