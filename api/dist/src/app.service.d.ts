import { PrismaService } from './prisma.service';
export declare class AppService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getHello(): string;
    dashboard(): Promise<{
        activeMembers: number;
        activeScheduleGroups: number;
        overduePayments: number;
        sentMessages: number;
    }>;
}
