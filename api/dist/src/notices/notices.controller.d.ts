import { NoticesService } from './notices.service';
export declare class NoticesController {
    private readonly noticesService;
    constructor(noticesService: NoticesService);
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
