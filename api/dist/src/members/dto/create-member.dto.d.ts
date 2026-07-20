export declare class CreateMemberDto {
    name: string;
    phone: string;
    email?: string;
    plan: string;
    dueDate: string;
    whatsappAllowed: boolean;
    attendanceFrequency?: 'TWO_DAYS' | 'THREE_DAYS' | 'DAILY';
    attendanceDays?: string[];
    scheduleGroupId?: string;
}
