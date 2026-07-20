import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly Member: "Member";
    readonly Payment: "Payment";
    readonly ScheduleGroup: "ScheduleGroup";
    readonly AdminUser: "AdminUser";
    readonly AuthSession: "AuthSession";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const MemberScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly phone: "phone";
    readonly email: "email";
    readonly plan: "plan";
    readonly dueDate: "dueDate";
    readonly whatsappAllowed: "whatsappAllowed";
    readonly status: "status";
    readonly attendanceFrequency: "attendanceFrequency";
    readonly attendanceDays: "attendanceDays";
    readonly scheduleGroupId: "scheduleGroupId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type MemberScalarFieldEnum = (typeof MemberScalarFieldEnum)[keyof typeof MemberScalarFieldEnum];
export declare const PaymentScalarFieldEnum: {
    readonly id: "id";
    readonly memberId: "memberId";
    readonly dueDate: "dueDate";
    readonly status: "status";
    readonly paidAt: "paidAt";
    readonly reminderSentAt: "reminderSentAt";
    readonly whatsappMessageId: "whatsappMessageId";
    readonly reminderError: "reminderError";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum];
export declare const ScheduleGroupScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly startTime: "startTime";
    readonly endTime: "endTime";
    readonly capacity: "capacity";
    readonly active: "active";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ScheduleGroupScalarFieldEnum = (typeof ScheduleGroupScalarFieldEnum)[keyof typeof ScheduleGroupScalarFieldEnum];
export declare const AdminUserScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly passwordHash: "passwordHash";
    readonly passwordSalt: "passwordSalt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type AdminUserScalarFieldEnum = (typeof AdminUserScalarFieldEnum)[keyof typeof AdminUserScalarFieldEnum];
export declare const AuthSessionScalarFieldEnum: {
    readonly id: "id";
    readonly tokenHash: "tokenHash";
    readonly userId: "userId";
    readonly expiresAt: "expiresAt";
    readonly createdAt: "createdAt";
};
export type AuthSessionScalarFieldEnum = (typeof AuthSessionScalarFieldEnum)[keyof typeof AuthSessionScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
