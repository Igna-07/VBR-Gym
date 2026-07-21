export declare const MemberStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly OVERDUE: "OVERDUE";
    readonly SUSPENDED: "SUSPENDED";
    readonly INACTIVE: "INACTIVE";
};
export type MemberStatus = (typeof MemberStatus)[keyof typeof MemberStatus];
export declare const AttendanceFrequency: {
    readonly TWO_DAYS: "TWO_DAYS";
    readonly THREE_DAYS: "THREE_DAYS";
    readonly DAILY: "DAILY";
};
export type AttendanceFrequency = (typeof AttendanceFrequency)[keyof typeof AttendanceFrequency];
export declare const PaymentStatus: {
    readonly PENDING: "PENDING";
    readonly PAID: "PAID";
    readonly OVERDUE: "OVERDUE";
    readonly EXEMPT: "EXEMPT";
};
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];
