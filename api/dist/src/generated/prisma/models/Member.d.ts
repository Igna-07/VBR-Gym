import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type MemberModel = runtime.Types.Result.DefaultSelection<Prisma.$MemberPayload>;
export type AggregateMember = {
    _count: MemberCountAggregateOutputType | null;
    _min: MemberMinAggregateOutputType | null;
    _max: MemberMaxAggregateOutputType | null;
};
export type MemberMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    phone: string | null;
    email: string | null;
    plan: string | null;
    dueDate: Date | null;
    whatsappAllowed: boolean | null;
    status: $Enums.MemberStatus | null;
    attendanceFrequency: $Enums.AttendanceFrequency | null;
    scheduleGroupId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type MemberMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    phone: string | null;
    email: string | null;
    plan: string | null;
    dueDate: Date | null;
    whatsappAllowed: boolean | null;
    status: $Enums.MemberStatus | null;
    attendanceFrequency: $Enums.AttendanceFrequency | null;
    scheduleGroupId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type MemberCountAggregateOutputType = {
    id: number;
    name: number;
    phone: number;
    email: number;
    plan: number;
    dueDate: number;
    whatsappAllowed: number;
    status: number;
    attendanceFrequency: number;
    attendanceDays: number;
    scheduleGroupId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type MemberMinAggregateInputType = {
    id?: true;
    name?: true;
    phone?: true;
    email?: true;
    plan?: true;
    dueDate?: true;
    whatsappAllowed?: true;
    status?: true;
    attendanceFrequency?: true;
    scheduleGroupId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type MemberMaxAggregateInputType = {
    id?: true;
    name?: true;
    phone?: true;
    email?: true;
    plan?: true;
    dueDate?: true;
    whatsappAllowed?: true;
    status?: true;
    attendanceFrequency?: true;
    scheduleGroupId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type MemberCountAggregateInputType = {
    id?: true;
    name?: true;
    phone?: true;
    email?: true;
    plan?: true;
    dueDate?: true;
    whatsappAllowed?: true;
    status?: true;
    attendanceFrequency?: true;
    attendanceDays?: true;
    scheduleGroupId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type MemberAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MemberWhereInput;
    orderBy?: Prisma.MemberOrderByWithRelationInput | Prisma.MemberOrderByWithRelationInput[];
    cursor?: Prisma.MemberWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | MemberCountAggregateInputType;
    _min?: MemberMinAggregateInputType;
    _max?: MemberMaxAggregateInputType;
};
export type GetMemberAggregateType<T extends MemberAggregateArgs> = {
    [P in keyof T & keyof AggregateMember]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMember[P]> : Prisma.GetScalarType<T[P], AggregateMember[P]>;
};
export type MemberGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MemberWhereInput;
    orderBy?: Prisma.MemberOrderByWithAggregationInput | Prisma.MemberOrderByWithAggregationInput[];
    by: Prisma.MemberScalarFieldEnum[] | Prisma.MemberScalarFieldEnum;
    having?: Prisma.MemberScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MemberCountAggregateInputType | true;
    _min?: MemberMinAggregateInputType;
    _max?: MemberMaxAggregateInputType;
};
export type MemberGroupByOutputType = {
    id: string;
    name: string;
    phone: string;
    email: string | null;
    plan: string;
    dueDate: Date | null;
    whatsappAllowed: boolean;
    status: $Enums.MemberStatus;
    attendanceFrequency: $Enums.AttendanceFrequency;
    attendanceDays: string[];
    scheduleGroupId: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: MemberCountAggregateOutputType | null;
    _min: MemberMinAggregateOutputType | null;
    _max: MemberMaxAggregateOutputType | null;
};
export type GetMemberGroupByPayload<T extends MemberGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MemberGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MemberGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MemberGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MemberGroupByOutputType[P]>;
}>>;
export type MemberWhereInput = {
    AND?: Prisma.MemberWhereInput | Prisma.MemberWhereInput[];
    OR?: Prisma.MemberWhereInput[];
    NOT?: Prisma.MemberWhereInput | Prisma.MemberWhereInput[];
    id?: Prisma.StringFilter<"Member"> | string;
    name?: Prisma.StringFilter<"Member"> | string;
    phone?: Prisma.StringFilter<"Member"> | string;
    email?: Prisma.StringNullableFilter<"Member"> | string | null;
    plan?: Prisma.StringFilter<"Member"> | string;
    dueDate?: Prisma.DateTimeNullableFilter<"Member"> | Date | string | null;
    whatsappAllowed?: Prisma.BoolFilter<"Member"> | boolean;
    status?: Prisma.EnumMemberStatusFilter<"Member"> | $Enums.MemberStatus;
    attendanceFrequency?: Prisma.EnumAttendanceFrequencyFilter<"Member"> | $Enums.AttendanceFrequency;
    attendanceDays?: Prisma.StringNullableListFilter<"Member">;
    scheduleGroupId?: Prisma.StringNullableFilter<"Member"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Member"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Member"> | Date | string;
    scheduleGroup?: Prisma.XOR<Prisma.ScheduleGroupNullableScalarRelationFilter, Prisma.ScheduleGroupWhereInput> | null;
    payments?: Prisma.PaymentListRelationFilter;
};
export type MemberOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    email?: Prisma.SortOrderInput | Prisma.SortOrder;
    plan?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    whatsappAllowed?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    attendanceFrequency?: Prisma.SortOrder;
    attendanceDays?: Prisma.SortOrder;
    scheduleGroupId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    scheduleGroup?: Prisma.ScheduleGroupOrderByWithRelationInput;
    payments?: Prisma.PaymentOrderByRelationAggregateInput;
};
export type MemberWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    phone?: string;
    email?: string;
    AND?: Prisma.MemberWhereInput | Prisma.MemberWhereInput[];
    OR?: Prisma.MemberWhereInput[];
    NOT?: Prisma.MemberWhereInput | Prisma.MemberWhereInput[];
    name?: Prisma.StringFilter<"Member"> | string;
    plan?: Prisma.StringFilter<"Member"> | string;
    dueDate?: Prisma.DateTimeNullableFilter<"Member"> | Date | string | null;
    whatsappAllowed?: Prisma.BoolFilter<"Member"> | boolean;
    status?: Prisma.EnumMemberStatusFilter<"Member"> | $Enums.MemberStatus;
    attendanceFrequency?: Prisma.EnumAttendanceFrequencyFilter<"Member"> | $Enums.AttendanceFrequency;
    attendanceDays?: Prisma.StringNullableListFilter<"Member">;
    scheduleGroupId?: Prisma.StringNullableFilter<"Member"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Member"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Member"> | Date | string;
    scheduleGroup?: Prisma.XOR<Prisma.ScheduleGroupNullableScalarRelationFilter, Prisma.ScheduleGroupWhereInput> | null;
    payments?: Prisma.PaymentListRelationFilter;
}, "id" | "phone" | "email">;
export type MemberOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    email?: Prisma.SortOrderInput | Prisma.SortOrder;
    plan?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    whatsappAllowed?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    attendanceFrequency?: Prisma.SortOrder;
    attendanceDays?: Prisma.SortOrder;
    scheduleGroupId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.MemberCountOrderByAggregateInput;
    _max?: Prisma.MemberMaxOrderByAggregateInput;
    _min?: Prisma.MemberMinOrderByAggregateInput;
};
export type MemberScalarWhereWithAggregatesInput = {
    AND?: Prisma.MemberScalarWhereWithAggregatesInput | Prisma.MemberScalarWhereWithAggregatesInput[];
    OR?: Prisma.MemberScalarWhereWithAggregatesInput[];
    NOT?: Prisma.MemberScalarWhereWithAggregatesInput | Prisma.MemberScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Member"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Member"> | string;
    phone?: Prisma.StringWithAggregatesFilter<"Member"> | string;
    email?: Prisma.StringNullableWithAggregatesFilter<"Member"> | string | null;
    plan?: Prisma.StringWithAggregatesFilter<"Member"> | string;
    dueDate?: Prisma.DateTimeNullableWithAggregatesFilter<"Member"> | Date | string | null;
    whatsappAllowed?: Prisma.BoolWithAggregatesFilter<"Member"> | boolean;
    status?: Prisma.EnumMemberStatusWithAggregatesFilter<"Member"> | $Enums.MemberStatus;
    attendanceFrequency?: Prisma.EnumAttendanceFrequencyWithAggregatesFilter<"Member"> | $Enums.AttendanceFrequency;
    attendanceDays?: Prisma.StringNullableListFilter<"Member">;
    scheduleGroupId?: Prisma.StringNullableWithAggregatesFilter<"Member"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Member"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Member"> | Date | string;
};
export type MemberCreateInput = {
    id?: string;
    name: string;
    phone: string;
    email?: string | null;
    plan: string;
    dueDate?: Date | string | null;
    whatsappAllowed?: boolean;
    status?: $Enums.MemberStatus;
    attendanceFrequency?: $Enums.AttendanceFrequency;
    attendanceDays?: Prisma.MemberCreateattendanceDaysInput | string[];
    createdAt?: Date | string;
    updatedAt?: Date | string;
    scheduleGroup?: Prisma.ScheduleGroupCreateNestedOneWithoutMembersInput;
    payments?: Prisma.PaymentCreateNestedManyWithoutMemberInput;
};
export type MemberUncheckedCreateInput = {
    id?: string;
    name: string;
    phone: string;
    email?: string | null;
    plan: string;
    dueDate?: Date | string | null;
    whatsappAllowed?: boolean;
    status?: $Enums.MemberStatus;
    attendanceFrequency?: $Enums.AttendanceFrequency;
    attendanceDays?: Prisma.MemberCreateattendanceDaysInput | string[];
    scheduleGroupId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutMemberInput;
};
export type MemberUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    plan?: Prisma.StringFieldUpdateOperationsInput | string;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    whatsappAllowed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus;
    attendanceFrequency?: Prisma.EnumAttendanceFrequencyFieldUpdateOperationsInput | $Enums.AttendanceFrequency;
    attendanceDays?: Prisma.MemberUpdateattendanceDaysInput | string[];
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    scheduleGroup?: Prisma.ScheduleGroupUpdateOneWithoutMembersNestedInput;
    payments?: Prisma.PaymentUpdateManyWithoutMemberNestedInput;
};
export type MemberUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    plan?: Prisma.StringFieldUpdateOperationsInput | string;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    whatsappAllowed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus;
    attendanceFrequency?: Prisma.EnumAttendanceFrequencyFieldUpdateOperationsInput | $Enums.AttendanceFrequency;
    attendanceDays?: Prisma.MemberUpdateattendanceDaysInput | string[];
    scheduleGroupId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    payments?: Prisma.PaymentUncheckedUpdateManyWithoutMemberNestedInput;
};
export type MemberCreateManyInput = {
    id?: string;
    name: string;
    phone: string;
    email?: string | null;
    plan: string;
    dueDate?: Date | string | null;
    whatsappAllowed?: boolean;
    status?: $Enums.MemberStatus;
    attendanceFrequency?: $Enums.AttendanceFrequency;
    attendanceDays?: Prisma.MemberCreateattendanceDaysInput | string[];
    scheduleGroupId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type MemberUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    plan?: Prisma.StringFieldUpdateOperationsInput | string;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    whatsappAllowed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus;
    attendanceFrequency?: Prisma.EnumAttendanceFrequencyFieldUpdateOperationsInput | $Enums.AttendanceFrequency;
    attendanceDays?: Prisma.MemberUpdateattendanceDaysInput | string[];
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MemberUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    plan?: Prisma.StringFieldUpdateOperationsInput | string;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    whatsappAllowed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus;
    attendanceFrequency?: Prisma.EnumAttendanceFrequencyFieldUpdateOperationsInput | $Enums.AttendanceFrequency;
    attendanceDays?: Prisma.MemberUpdateattendanceDaysInput | string[];
    scheduleGroupId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    has?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    hasEvery?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    hasSome?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    isEmpty?: boolean;
};
export type MemberCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    plan?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrder;
    whatsappAllowed?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    attendanceFrequency?: Prisma.SortOrder;
    attendanceDays?: Prisma.SortOrder;
    scheduleGroupId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type MemberMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    plan?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrder;
    whatsappAllowed?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    attendanceFrequency?: Prisma.SortOrder;
    scheduleGroupId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type MemberMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    plan?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrder;
    whatsappAllowed?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    attendanceFrequency?: Prisma.SortOrder;
    scheduleGroupId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type MemberScalarRelationFilter = {
    is?: Prisma.MemberWhereInput;
    isNot?: Prisma.MemberWhereInput;
};
export type MemberListRelationFilter = {
    every?: Prisma.MemberWhereInput;
    some?: Prisma.MemberWhereInput;
    none?: Prisma.MemberWhereInput;
};
export type MemberOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type MemberCreateattendanceDaysInput = {
    set: string[];
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type EnumMemberStatusFieldUpdateOperationsInput = {
    set?: $Enums.MemberStatus;
};
export type EnumAttendanceFrequencyFieldUpdateOperationsInput = {
    set?: $Enums.AttendanceFrequency;
};
export type MemberUpdateattendanceDaysInput = {
    set?: string[];
    push?: string | string[];
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type MemberCreateNestedOneWithoutPaymentsInput = {
    create?: Prisma.XOR<Prisma.MemberCreateWithoutPaymentsInput, Prisma.MemberUncheckedCreateWithoutPaymentsInput>;
    connectOrCreate?: Prisma.MemberCreateOrConnectWithoutPaymentsInput;
    connect?: Prisma.MemberWhereUniqueInput;
};
export type MemberUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: Prisma.XOR<Prisma.MemberCreateWithoutPaymentsInput, Prisma.MemberUncheckedCreateWithoutPaymentsInput>;
    connectOrCreate?: Prisma.MemberCreateOrConnectWithoutPaymentsInput;
    upsert?: Prisma.MemberUpsertWithoutPaymentsInput;
    connect?: Prisma.MemberWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MemberUpdateToOneWithWhereWithoutPaymentsInput, Prisma.MemberUpdateWithoutPaymentsInput>, Prisma.MemberUncheckedUpdateWithoutPaymentsInput>;
};
export type MemberCreateNestedManyWithoutScheduleGroupInput = {
    create?: Prisma.XOR<Prisma.MemberCreateWithoutScheduleGroupInput, Prisma.MemberUncheckedCreateWithoutScheduleGroupInput> | Prisma.MemberCreateWithoutScheduleGroupInput[] | Prisma.MemberUncheckedCreateWithoutScheduleGroupInput[];
    connectOrCreate?: Prisma.MemberCreateOrConnectWithoutScheduleGroupInput | Prisma.MemberCreateOrConnectWithoutScheduleGroupInput[];
    createMany?: Prisma.MemberCreateManyScheduleGroupInputEnvelope;
    connect?: Prisma.MemberWhereUniqueInput | Prisma.MemberWhereUniqueInput[];
};
export type MemberUncheckedCreateNestedManyWithoutScheduleGroupInput = {
    create?: Prisma.XOR<Prisma.MemberCreateWithoutScheduleGroupInput, Prisma.MemberUncheckedCreateWithoutScheduleGroupInput> | Prisma.MemberCreateWithoutScheduleGroupInput[] | Prisma.MemberUncheckedCreateWithoutScheduleGroupInput[];
    connectOrCreate?: Prisma.MemberCreateOrConnectWithoutScheduleGroupInput | Prisma.MemberCreateOrConnectWithoutScheduleGroupInput[];
    createMany?: Prisma.MemberCreateManyScheduleGroupInputEnvelope;
    connect?: Prisma.MemberWhereUniqueInput | Prisma.MemberWhereUniqueInput[];
};
export type MemberUpdateManyWithoutScheduleGroupNestedInput = {
    create?: Prisma.XOR<Prisma.MemberCreateWithoutScheduleGroupInput, Prisma.MemberUncheckedCreateWithoutScheduleGroupInput> | Prisma.MemberCreateWithoutScheduleGroupInput[] | Prisma.MemberUncheckedCreateWithoutScheduleGroupInput[];
    connectOrCreate?: Prisma.MemberCreateOrConnectWithoutScheduleGroupInput | Prisma.MemberCreateOrConnectWithoutScheduleGroupInput[];
    upsert?: Prisma.MemberUpsertWithWhereUniqueWithoutScheduleGroupInput | Prisma.MemberUpsertWithWhereUniqueWithoutScheduleGroupInput[];
    createMany?: Prisma.MemberCreateManyScheduleGroupInputEnvelope;
    set?: Prisma.MemberWhereUniqueInput | Prisma.MemberWhereUniqueInput[];
    disconnect?: Prisma.MemberWhereUniqueInput | Prisma.MemberWhereUniqueInput[];
    delete?: Prisma.MemberWhereUniqueInput | Prisma.MemberWhereUniqueInput[];
    connect?: Prisma.MemberWhereUniqueInput | Prisma.MemberWhereUniqueInput[];
    update?: Prisma.MemberUpdateWithWhereUniqueWithoutScheduleGroupInput | Prisma.MemberUpdateWithWhereUniqueWithoutScheduleGroupInput[];
    updateMany?: Prisma.MemberUpdateManyWithWhereWithoutScheduleGroupInput | Prisma.MemberUpdateManyWithWhereWithoutScheduleGroupInput[];
    deleteMany?: Prisma.MemberScalarWhereInput | Prisma.MemberScalarWhereInput[];
};
export type MemberUncheckedUpdateManyWithoutScheduleGroupNestedInput = {
    create?: Prisma.XOR<Prisma.MemberCreateWithoutScheduleGroupInput, Prisma.MemberUncheckedCreateWithoutScheduleGroupInput> | Prisma.MemberCreateWithoutScheduleGroupInput[] | Prisma.MemberUncheckedCreateWithoutScheduleGroupInput[];
    connectOrCreate?: Prisma.MemberCreateOrConnectWithoutScheduleGroupInput | Prisma.MemberCreateOrConnectWithoutScheduleGroupInput[];
    upsert?: Prisma.MemberUpsertWithWhereUniqueWithoutScheduleGroupInput | Prisma.MemberUpsertWithWhereUniqueWithoutScheduleGroupInput[];
    createMany?: Prisma.MemberCreateManyScheduleGroupInputEnvelope;
    set?: Prisma.MemberWhereUniqueInput | Prisma.MemberWhereUniqueInput[];
    disconnect?: Prisma.MemberWhereUniqueInput | Prisma.MemberWhereUniqueInput[];
    delete?: Prisma.MemberWhereUniqueInput | Prisma.MemberWhereUniqueInput[];
    connect?: Prisma.MemberWhereUniqueInput | Prisma.MemberWhereUniqueInput[];
    update?: Prisma.MemberUpdateWithWhereUniqueWithoutScheduleGroupInput | Prisma.MemberUpdateWithWhereUniqueWithoutScheduleGroupInput[];
    updateMany?: Prisma.MemberUpdateManyWithWhereWithoutScheduleGroupInput | Prisma.MemberUpdateManyWithWhereWithoutScheduleGroupInput[];
    deleteMany?: Prisma.MemberScalarWhereInput | Prisma.MemberScalarWhereInput[];
};
export type MemberCreateWithoutPaymentsInput = {
    id?: string;
    name: string;
    phone: string;
    email?: string | null;
    plan: string;
    dueDate?: Date | string | null;
    whatsappAllowed?: boolean;
    status?: $Enums.MemberStatus;
    attendanceFrequency?: $Enums.AttendanceFrequency;
    attendanceDays?: Prisma.MemberCreateattendanceDaysInput | string[];
    createdAt?: Date | string;
    updatedAt?: Date | string;
    scheduleGroup?: Prisma.ScheduleGroupCreateNestedOneWithoutMembersInput;
};
export type MemberUncheckedCreateWithoutPaymentsInput = {
    id?: string;
    name: string;
    phone: string;
    email?: string | null;
    plan: string;
    dueDate?: Date | string | null;
    whatsappAllowed?: boolean;
    status?: $Enums.MemberStatus;
    attendanceFrequency?: $Enums.AttendanceFrequency;
    attendanceDays?: Prisma.MemberCreateattendanceDaysInput | string[];
    scheduleGroupId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type MemberCreateOrConnectWithoutPaymentsInput = {
    where: Prisma.MemberWhereUniqueInput;
    create: Prisma.XOR<Prisma.MemberCreateWithoutPaymentsInput, Prisma.MemberUncheckedCreateWithoutPaymentsInput>;
};
export type MemberUpsertWithoutPaymentsInput = {
    update: Prisma.XOR<Prisma.MemberUpdateWithoutPaymentsInput, Prisma.MemberUncheckedUpdateWithoutPaymentsInput>;
    create: Prisma.XOR<Prisma.MemberCreateWithoutPaymentsInput, Prisma.MemberUncheckedCreateWithoutPaymentsInput>;
    where?: Prisma.MemberWhereInput;
};
export type MemberUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: Prisma.MemberWhereInput;
    data: Prisma.XOR<Prisma.MemberUpdateWithoutPaymentsInput, Prisma.MemberUncheckedUpdateWithoutPaymentsInput>;
};
export type MemberUpdateWithoutPaymentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    plan?: Prisma.StringFieldUpdateOperationsInput | string;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    whatsappAllowed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus;
    attendanceFrequency?: Prisma.EnumAttendanceFrequencyFieldUpdateOperationsInput | $Enums.AttendanceFrequency;
    attendanceDays?: Prisma.MemberUpdateattendanceDaysInput | string[];
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    scheduleGroup?: Prisma.ScheduleGroupUpdateOneWithoutMembersNestedInput;
};
export type MemberUncheckedUpdateWithoutPaymentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    plan?: Prisma.StringFieldUpdateOperationsInput | string;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    whatsappAllowed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus;
    attendanceFrequency?: Prisma.EnumAttendanceFrequencyFieldUpdateOperationsInput | $Enums.AttendanceFrequency;
    attendanceDays?: Prisma.MemberUpdateattendanceDaysInput | string[];
    scheduleGroupId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MemberCreateWithoutScheduleGroupInput = {
    id?: string;
    name: string;
    phone: string;
    email?: string | null;
    plan: string;
    dueDate?: Date | string | null;
    whatsappAllowed?: boolean;
    status?: $Enums.MemberStatus;
    attendanceFrequency?: $Enums.AttendanceFrequency;
    attendanceDays?: Prisma.MemberCreateattendanceDaysInput | string[];
    createdAt?: Date | string;
    updatedAt?: Date | string;
    payments?: Prisma.PaymentCreateNestedManyWithoutMemberInput;
};
export type MemberUncheckedCreateWithoutScheduleGroupInput = {
    id?: string;
    name: string;
    phone: string;
    email?: string | null;
    plan: string;
    dueDate?: Date | string | null;
    whatsappAllowed?: boolean;
    status?: $Enums.MemberStatus;
    attendanceFrequency?: $Enums.AttendanceFrequency;
    attendanceDays?: Prisma.MemberCreateattendanceDaysInput | string[];
    createdAt?: Date | string;
    updatedAt?: Date | string;
    payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutMemberInput;
};
export type MemberCreateOrConnectWithoutScheduleGroupInput = {
    where: Prisma.MemberWhereUniqueInput;
    create: Prisma.XOR<Prisma.MemberCreateWithoutScheduleGroupInput, Prisma.MemberUncheckedCreateWithoutScheduleGroupInput>;
};
export type MemberCreateManyScheduleGroupInputEnvelope = {
    data: Prisma.MemberCreateManyScheduleGroupInput | Prisma.MemberCreateManyScheduleGroupInput[];
    skipDuplicates?: boolean;
};
export type MemberUpsertWithWhereUniqueWithoutScheduleGroupInput = {
    where: Prisma.MemberWhereUniqueInput;
    update: Prisma.XOR<Prisma.MemberUpdateWithoutScheduleGroupInput, Prisma.MemberUncheckedUpdateWithoutScheduleGroupInput>;
    create: Prisma.XOR<Prisma.MemberCreateWithoutScheduleGroupInput, Prisma.MemberUncheckedCreateWithoutScheduleGroupInput>;
};
export type MemberUpdateWithWhereUniqueWithoutScheduleGroupInput = {
    where: Prisma.MemberWhereUniqueInput;
    data: Prisma.XOR<Prisma.MemberUpdateWithoutScheduleGroupInput, Prisma.MemberUncheckedUpdateWithoutScheduleGroupInput>;
};
export type MemberUpdateManyWithWhereWithoutScheduleGroupInput = {
    where: Prisma.MemberScalarWhereInput;
    data: Prisma.XOR<Prisma.MemberUpdateManyMutationInput, Prisma.MemberUncheckedUpdateManyWithoutScheduleGroupInput>;
};
export type MemberScalarWhereInput = {
    AND?: Prisma.MemberScalarWhereInput | Prisma.MemberScalarWhereInput[];
    OR?: Prisma.MemberScalarWhereInput[];
    NOT?: Prisma.MemberScalarWhereInput | Prisma.MemberScalarWhereInput[];
    id?: Prisma.StringFilter<"Member"> | string;
    name?: Prisma.StringFilter<"Member"> | string;
    phone?: Prisma.StringFilter<"Member"> | string;
    email?: Prisma.StringNullableFilter<"Member"> | string | null;
    plan?: Prisma.StringFilter<"Member"> | string;
    dueDate?: Prisma.DateTimeNullableFilter<"Member"> | Date | string | null;
    whatsappAllowed?: Prisma.BoolFilter<"Member"> | boolean;
    status?: Prisma.EnumMemberStatusFilter<"Member"> | $Enums.MemberStatus;
    attendanceFrequency?: Prisma.EnumAttendanceFrequencyFilter<"Member"> | $Enums.AttendanceFrequency;
    attendanceDays?: Prisma.StringNullableListFilter<"Member">;
    scheduleGroupId?: Prisma.StringNullableFilter<"Member"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Member"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Member"> | Date | string;
};
export type MemberCreateManyScheduleGroupInput = {
    id?: string;
    name: string;
    phone: string;
    email?: string | null;
    plan: string;
    dueDate?: Date | string | null;
    whatsappAllowed?: boolean;
    status?: $Enums.MemberStatus;
    attendanceFrequency?: $Enums.AttendanceFrequency;
    attendanceDays?: Prisma.MemberCreateattendanceDaysInput | string[];
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type MemberUpdateWithoutScheduleGroupInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    plan?: Prisma.StringFieldUpdateOperationsInput | string;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    whatsappAllowed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus;
    attendanceFrequency?: Prisma.EnumAttendanceFrequencyFieldUpdateOperationsInput | $Enums.AttendanceFrequency;
    attendanceDays?: Prisma.MemberUpdateattendanceDaysInput | string[];
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    payments?: Prisma.PaymentUpdateManyWithoutMemberNestedInput;
};
export type MemberUncheckedUpdateWithoutScheduleGroupInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    plan?: Prisma.StringFieldUpdateOperationsInput | string;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    whatsappAllowed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus;
    attendanceFrequency?: Prisma.EnumAttendanceFrequencyFieldUpdateOperationsInput | $Enums.AttendanceFrequency;
    attendanceDays?: Prisma.MemberUpdateattendanceDaysInput | string[];
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    payments?: Prisma.PaymentUncheckedUpdateManyWithoutMemberNestedInput;
};
export type MemberUncheckedUpdateManyWithoutScheduleGroupInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    plan?: Prisma.StringFieldUpdateOperationsInput | string;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    whatsappAllowed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    status?: Prisma.EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus;
    attendanceFrequency?: Prisma.EnumAttendanceFrequencyFieldUpdateOperationsInput | $Enums.AttendanceFrequency;
    attendanceDays?: Prisma.MemberUpdateattendanceDaysInput | string[];
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MemberCountOutputType = {
    payments: number;
};
export type MemberCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    payments?: boolean | MemberCountOutputTypeCountPaymentsArgs;
};
export type MemberCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MemberCountOutputTypeSelect<ExtArgs> | null;
};
export type MemberCountOutputTypeCountPaymentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PaymentWhereInput;
};
export type MemberSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    phone?: boolean;
    email?: boolean;
    plan?: boolean;
    dueDate?: boolean;
    whatsappAllowed?: boolean;
    status?: boolean;
    attendanceFrequency?: boolean;
    attendanceDays?: boolean;
    scheduleGroupId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    scheduleGroup?: boolean | Prisma.Member$scheduleGroupArgs<ExtArgs>;
    payments?: boolean | Prisma.Member$paymentsArgs<ExtArgs>;
    _count?: boolean | Prisma.MemberCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["member"]>;
export type MemberSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    phone?: boolean;
    email?: boolean;
    plan?: boolean;
    dueDate?: boolean;
    whatsappAllowed?: boolean;
    status?: boolean;
    attendanceFrequency?: boolean;
    attendanceDays?: boolean;
    scheduleGroupId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    scheduleGroup?: boolean | Prisma.Member$scheduleGroupArgs<ExtArgs>;
}, ExtArgs["result"]["member"]>;
export type MemberSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    phone?: boolean;
    email?: boolean;
    plan?: boolean;
    dueDate?: boolean;
    whatsappAllowed?: boolean;
    status?: boolean;
    attendanceFrequency?: boolean;
    attendanceDays?: boolean;
    scheduleGroupId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    scheduleGroup?: boolean | Prisma.Member$scheduleGroupArgs<ExtArgs>;
}, ExtArgs["result"]["member"]>;
export type MemberSelectScalar = {
    id?: boolean;
    name?: boolean;
    phone?: boolean;
    email?: boolean;
    plan?: boolean;
    dueDate?: boolean;
    whatsappAllowed?: boolean;
    status?: boolean;
    attendanceFrequency?: boolean;
    attendanceDays?: boolean;
    scheduleGroupId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type MemberOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "phone" | "email" | "plan" | "dueDate" | "whatsappAllowed" | "status" | "attendanceFrequency" | "attendanceDays" | "scheduleGroupId" | "createdAt" | "updatedAt", ExtArgs["result"]["member"]>;
export type MemberInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    scheduleGroup?: boolean | Prisma.Member$scheduleGroupArgs<ExtArgs>;
    payments?: boolean | Prisma.Member$paymentsArgs<ExtArgs>;
    _count?: boolean | Prisma.MemberCountOutputTypeDefaultArgs<ExtArgs>;
};
export type MemberIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    scheduleGroup?: boolean | Prisma.Member$scheduleGroupArgs<ExtArgs>;
};
export type MemberIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    scheduleGroup?: boolean | Prisma.Member$scheduleGroupArgs<ExtArgs>;
};
export type $MemberPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Member";
    objects: {
        scheduleGroup: Prisma.$ScheduleGroupPayload<ExtArgs> | null;
        payments: Prisma.$PaymentPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        phone: string;
        email: string | null;
        plan: string;
        dueDate: Date | null;
        whatsappAllowed: boolean;
        status: $Enums.MemberStatus;
        attendanceFrequency: $Enums.AttendanceFrequency;
        attendanceDays: string[];
        scheduleGroupId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["member"]>;
    composites: {};
};
export type MemberGetPayload<S extends boolean | null | undefined | MemberDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MemberPayload, S>;
export type MemberCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<MemberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MemberCountAggregateInputType | true;
};
export interface MemberDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Member'];
        meta: {
            name: 'Member';
        };
    };
    findUnique<T extends MemberFindUniqueArgs>(args: Prisma.SelectSubset<T, MemberFindUniqueArgs<ExtArgs>>): Prisma.Prisma__MemberClient<runtime.Types.Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends MemberFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, MemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__MemberClient<runtime.Types.Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends MemberFindFirstArgs>(args?: Prisma.SelectSubset<T, MemberFindFirstArgs<ExtArgs>>): Prisma.Prisma__MemberClient<runtime.Types.Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends MemberFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, MemberFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__MemberClient<runtime.Types.Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends MemberFindManyArgs>(args?: Prisma.SelectSubset<T, MemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends MemberCreateArgs>(args: Prisma.SelectSubset<T, MemberCreateArgs<ExtArgs>>): Prisma.Prisma__MemberClient<runtime.Types.Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends MemberCreateManyArgs>(args?: Prisma.SelectSubset<T, MemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends MemberCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, MemberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends MemberDeleteArgs>(args: Prisma.SelectSubset<T, MemberDeleteArgs<ExtArgs>>): Prisma.Prisma__MemberClient<runtime.Types.Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends MemberUpdateArgs>(args: Prisma.SelectSubset<T, MemberUpdateArgs<ExtArgs>>): Prisma.Prisma__MemberClient<runtime.Types.Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends MemberDeleteManyArgs>(args?: Prisma.SelectSubset<T, MemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends MemberUpdateManyArgs>(args: Prisma.SelectSubset<T, MemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends MemberUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, MemberUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends MemberUpsertArgs>(args: Prisma.SelectSubset<T, MemberUpsertArgs<ExtArgs>>): Prisma.Prisma__MemberClient<runtime.Types.Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends MemberCountArgs>(args?: Prisma.Subset<T, MemberCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MemberCountAggregateOutputType> : number>;
    aggregate<T extends MemberAggregateArgs>(args: Prisma.Subset<T, MemberAggregateArgs>): Prisma.PrismaPromise<GetMemberAggregateType<T>>;
    groupBy<T extends MemberGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: MemberGroupByArgs['orderBy'];
    } : {
        orderBy?: MemberGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, MemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: MemberFieldRefs;
}
export interface Prisma__MemberClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    scheduleGroup<T extends Prisma.Member$scheduleGroupArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Member$scheduleGroupArgs<ExtArgs>>): Prisma.Prisma__ScheduleGroupClient<runtime.Types.Result.GetResult<Prisma.$ScheduleGroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    payments<T extends Prisma.Member$paymentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Member$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface MemberFieldRefs {
    readonly id: Prisma.FieldRef<"Member", 'String'>;
    readonly name: Prisma.FieldRef<"Member", 'String'>;
    readonly phone: Prisma.FieldRef<"Member", 'String'>;
    readonly email: Prisma.FieldRef<"Member", 'String'>;
    readonly plan: Prisma.FieldRef<"Member", 'String'>;
    readonly dueDate: Prisma.FieldRef<"Member", 'DateTime'>;
    readonly whatsappAllowed: Prisma.FieldRef<"Member", 'Boolean'>;
    readonly status: Prisma.FieldRef<"Member", 'MemberStatus'>;
    readonly attendanceFrequency: Prisma.FieldRef<"Member", 'AttendanceFrequency'>;
    readonly attendanceDays: Prisma.FieldRef<"Member", 'String[]'>;
    readonly scheduleGroupId: Prisma.FieldRef<"Member", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Member", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Member", 'DateTime'>;
}
export type MemberFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MemberSelect<ExtArgs> | null;
    omit?: Prisma.MemberOmit<ExtArgs> | null;
    include?: Prisma.MemberInclude<ExtArgs> | null;
    where: Prisma.MemberWhereUniqueInput;
};
export type MemberFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MemberSelect<ExtArgs> | null;
    omit?: Prisma.MemberOmit<ExtArgs> | null;
    include?: Prisma.MemberInclude<ExtArgs> | null;
    where: Prisma.MemberWhereUniqueInput;
};
export type MemberFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MemberSelect<ExtArgs> | null;
    omit?: Prisma.MemberOmit<ExtArgs> | null;
    include?: Prisma.MemberInclude<ExtArgs> | null;
    where?: Prisma.MemberWhereInput;
    orderBy?: Prisma.MemberOrderByWithRelationInput | Prisma.MemberOrderByWithRelationInput[];
    cursor?: Prisma.MemberWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MemberScalarFieldEnum | Prisma.MemberScalarFieldEnum[];
};
export type MemberFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MemberSelect<ExtArgs> | null;
    omit?: Prisma.MemberOmit<ExtArgs> | null;
    include?: Prisma.MemberInclude<ExtArgs> | null;
    where?: Prisma.MemberWhereInput;
    orderBy?: Prisma.MemberOrderByWithRelationInput | Prisma.MemberOrderByWithRelationInput[];
    cursor?: Prisma.MemberWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MemberScalarFieldEnum | Prisma.MemberScalarFieldEnum[];
};
export type MemberFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MemberSelect<ExtArgs> | null;
    omit?: Prisma.MemberOmit<ExtArgs> | null;
    include?: Prisma.MemberInclude<ExtArgs> | null;
    where?: Prisma.MemberWhereInput;
    orderBy?: Prisma.MemberOrderByWithRelationInput | Prisma.MemberOrderByWithRelationInput[];
    cursor?: Prisma.MemberWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MemberScalarFieldEnum | Prisma.MemberScalarFieldEnum[];
};
export type MemberCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MemberSelect<ExtArgs> | null;
    omit?: Prisma.MemberOmit<ExtArgs> | null;
    include?: Prisma.MemberInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MemberCreateInput, Prisma.MemberUncheckedCreateInput>;
};
export type MemberCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.MemberCreateManyInput | Prisma.MemberCreateManyInput[];
    skipDuplicates?: boolean;
};
export type MemberCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MemberSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MemberOmit<ExtArgs> | null;
    data: Prisma.MemberCreateManyInput | Prisma.MemberCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.MemberIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type MemberUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MemberSelect<ExtArgs> | null;
    omit?: Prisma.MemberOmit<ExtArgs> | null;
    include?: Prisma.MemberInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MemberUpdateInput, Prisma.MemberUncheckedUpdateInput>;
    where: Prisma.MemberWhereUniqueInput;
};
export type MemberUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.MemberUpdateManyMutationInput, Prisma.MemberUncheckedUpdateManyInput>;
    where?: Prisma.MemberWhereInput;
    limit?: number;
};
export type MemberUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MemberSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MemberOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MemberUpdateManyMutationInput, Prisma.MemberUncheckedUpdateManyInput>;
    where?: Prisma.MemberWhereInput;
    limit?: number;
    include?: Prisma.MemberIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type MemberUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MemberSelect<ExtArgs> | null;
    omit?: Prisma.MemberOmit<ExtArgs> | null;
    include?: Prisma.MemberInclude<ExtArgs> | null;
    where: Prisma.MemberWhereUniqueInput;
    create: Prisma.XOR<Prisma.MemberCreateInput, Prisma.MemberUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.MemberUpdateInput, Prisma.MemberUncheckedUpdateInput>;
};
export type MemberDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MemberSelect<ExtArgs> | null;
    omit?: Prisma.MemberOmit<ExtArgs> | null;
    include?: Prisma.MemberInclude<ExtArgs> | null;
    where: Prisma.MemberWhereUniqueInput;
};
export type MemberDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MemberWhereInput;
    limit?: number;
};
export type Member$scheduleGroupArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ScheduleGroupSelect<ExtArgs> | null;
    omit?: Prisma.ScheduleGroupOmit<ExtArgs> | null;
    include?: Prisma.ScheduleGroupInclude<ExtArgs> | null;
    where?: Prisma.ScheduleGroupWhereInput;
};
export type Member$paymentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelect<ExtArgs> | null;
    omit?: Prisma.PaymentOmit<ExtArgs> | null;
    include?: Prisma.PaymentInclude<ExtArgs> | null;
    where?: Prisma.PaymentWhereInput;
    orderBy?: Prisma.PaymentOrderByWithRelationInput | Prisma.PaymentOrderByWithRelationInput[];
    cursor?: Prisma.PaymentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PaymentScalarFieldEnum | Prisma.PaymentScalarFieldEnum[];
};
export type MemberDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MemberSelect<ExtArgs> | null;
    omit?: Prisma.MemberOmit<ExtArgs> | null;
    include?: Prisma.MemberInclude<ExtArgs> | null;
};
