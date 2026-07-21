import { CreateMemberDto } from './dto/create-member.dto';
import { MembersService } from './members.service';
export declare class MembersController {
    private readonly membersService;
    constructor(membersService: MembersService);
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
