import { ConfigService } from '@nestjs/config';
export declare class WhatsappService {
    private readonly config;
    constructor(config: ConfigService);
    isConfigured(): boolean;
    senderNumber(): string;
    sendPaymentReminder(phone: string, memberName: string, dueDate: Date): Promise<string | null>;
}
