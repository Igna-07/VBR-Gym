import { PrismaService } from '../prisma.service';
export declare class NoticesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: string;
        type: string;
        severity: string;
        title: string;
        detail: string;
        paymentId: string;
        memberName: string;
        phone: string;
        whatsappAllowed: boolean;
        dueDate: Date;
        schedule: string;
    }[]>;
}
