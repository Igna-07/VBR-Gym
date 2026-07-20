import { PrismaService } from '../prisma.service';
import { CreateMemberDto } from './dto/create-member.dto';
export declare class MembersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): import("../generated/prisma/internal/prismaNamespace").PrismaPromise<{
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
    }[]>;
    create(data: CreateMemberDto): Promise<{
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
    }>;
}
