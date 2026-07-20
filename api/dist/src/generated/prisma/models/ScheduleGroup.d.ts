import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ScheduleGroupModel = runtime.Types.Result.DefaultSelection<Prisma.$ScheduleGroupPayload>;
export type AggregateScheduleGroup = {
    _count: ScheduleGroupCountAggregateOutputType | null;
    _avg: ScheduleGroupAvgAggregateOutputType | null;
    _sum: ScheduleGroupSumAggregateOutputType | null;
    _min: ScheduleGroupMinAggregateOutputType | null;
    _max: ScheduleGroupMaxAggregateOutputType | null;
};
export type ScheduleGroupAvgAggregateOutputType = {
    capacity: number | null;
};
export type ScheduleGroupSumAggregateOutputType = {
    capacity: number | null;
};
export type ScheduleGroupMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    startTime: string | null;
    endTime: string | null;
    capacity: number | null;
    active: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ScheduleGroupMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    startTime: string | null;
    endTime: string | null;
    capacity: number | null;
    active: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ScheduleGroupCountAggregateOutputType = {
    id: number;
    name: number;
    startTime: number;
    endTime: number;
    capacity: number;
    active: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ScheduleGroupAvgAggregateInputType = {
    capacity?: true;
};
export type ScheduleGroupSumAggregateInputType = {
    capacity?: true;
};
export type ScheduleGroupMinAggregateInputType = {
    id?: true;
    name?: true;
    startTime?: true;
    endTime?: true;
    capacity?: true;
    active?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ScheduleGroupMaxAggregateInputType = {
    id?: true;
    name?: true;
    startTime?: true;
    endTime?: true;
    capacity?: true;
    active?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ScheduleGroupCountAggregateInputType = {
    id?: true;
    name?: true;
    startTime?: true;
    endTime?: true;
    capacity?: true;
    active?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ScheduleGroupAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ScheduleGroupWhereInput;
    orderBy?: Prisma.ScheduleGroupOrderByWithRelationInput | Prisma.ScheduleGroupOrderByWithRelationInput[];
    cursor?: Prisma.ScheduleGroupWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ScheduleGroupCountAggregateInputType;
    _avg?: ScheduleGroupAvgAggregateInputType;
    _sum?: ScheduleGroupSumAggregateInputType;
    _min?: ScheduleGroupMinAggregateInputType;
    _max?: ScheduleGroupMaxAggregateInputType;
};
export type GetScheduleGroupAggregateType<T extends ScheduleGroupAggregateArgs> = {
    [P in keyof T & keyof AggregateScheduleGroup]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateScheduleGroup[P]> : Prisma.GetScalarType<T[P], AggregateScheduleGroup[P]>;
};
export type ScheduleGroupGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ScheduleGroupWhereInput;
    orderBy?: Prisma.ScheduleGroupOrderByWithAggregationInput | Prisma.ScheduleGroupOrderByWithAggregationInput[];
    by: Prisma.ScheduleGroupScalarFieldEnum[] | Prisma.ScheduleGroupScalarFieldEnum;
    having?: Prisma.ScheduleGroupScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ScheduleGroupCountAggregateInputType | true;
    _avg?: ScheduleGroupAvgAggregateInputType;
    _sum?: ScheduleGroupSumAggregateInputType;
    _min?: ScheduleGroupMinAggregateInputType;
    _max?: ScheduleGroupMaxAggregateInputType;
};
export type ScheduleGroupGroupByOutputType = {
    id: string;
    name: string;
    startTime: string;
    endTime: string;
    capacity: number;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: ScheduleGroupCountAggregateOutputType | null;
    _avg: ScheduleGroupAvgAggregateOutputType | null;
    _sum: ScheduleGroupSumAggregateOutputType | null;
    _min: ScheduleGroupMinAggregateOutputType | null;
    _max: ScheduleGroupMaxAggregateOutputType | null;
};
export type GetScheduleGroupGroupByPayload<T extends ScheduleGroupGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ScheduleGroupGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ScheduleGroupGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ScheduleGroupGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ScheduleGroupGroupByOutputType[P]>;
}>>;
export type ScheduleGroupWhereInput = {
    AND?: Prisma.ScheduleGroupWhereInput | Prisma.ScheduleGroupWhereInput[];
    OR?: Prisma.ScheduleGroupWhereInput[];
    NOT?: Prisma.ScheduleGroupWhereInput | Prisma.ScheduleGroupWhereInput[];
    id?: Prisma.StringFilter<"ScheduleGroup"> | string;
    name?: Prisma.StringFilter<"ScheduleGroup"> | string;
    startTime?: Prisma.StringFilter<"ScheduleGroup"> | string;
    endTime?: Prisma.StringFilter<"ScheduleGroup"> | string;
    capacity?: Prisma.IntFilter<"ScheduleGroup"> | number;
    active?: Prisma.BoolFilter<"ScheduleGroup"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"ScheduleGroup"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ScheduleGroup"> | Date | string;
    members?: Prisma.MemberListRelationFilter;
};
export type ScheduleGroupOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    startTime?: Prisma.SortOrder;
    endTime?: Prisma.SortOrder;
    capacity?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    members?: Prisma.MemberOrderByRelationAggregateInput;
};
export type ScheduleGroupWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ScheduleGroupWhereInput | Prisma.ScheduleGroupWhereInput[];
    OR?: Prisma.ScheduleGroupWhereInput[];
    NOT?: Prisma.ScheduleGroupWhereInput | Prisma.ScheduleGroupWhereInput[];
    name?: Prisma.StringFilter<"ScheduleGroup"> | string;
    startTime?: Prisma.StringFilter<"ScheduleGroup"> | string;
    endTime?: Prisma.StringFilter<"ScheduleGroup"> | string;
    capacity?: Prisma.IntFilter<"ScheduleGroup"> | number;
    active?: Prisma.BoolFilter<"ScheduleGroup"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"ScheduleGroup"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ScheduleGroup"> | Date | string;
    members?: Prisma.MemberListRelationFilter;
}, "id">;
export type ScheduleGroupOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    startTime?: Prisma.SortOrder;
    endTime?: Prisma.SortOrder;
    capacity?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ScheduleGroupCountOrderByAggregateInput;
    _avg?: Prisma.ScheduleGroupAvgOrderByAggregateInput;
    _max?: Prisma.ScheduleGroupMaxOrderByAggregateInput;
    _min?: Prisma.ScheduleGroupMinOrderByAggregateInput;
    _sum?: Prisma.ScheduleGroupSumOrderByAggregateInput;
};
export type ScheduleGroupScalarWhereWithAggregatesInput = {
    AND?: Prisma.ScheduleGroupScalarWhereWithAggregatesInput | Prisma.ScheduleGroupScalarWhereWithAggregatesInput[];
    OR?: Prisma.ScheduleGroupScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ScheduleGroupScalarWhereWithAggregatesInput | Prisma.ScheduleGroupScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ScheduleGroup"> | string;
    name?: Prisma.StringWithAggregatesFilter<"ScheduleGroup"> | string;
    startTime?: Prisma.StringWithAggregatesFilter<"ScheduleGroup"> | string;
    endTime?: Prisma.StringWithAggregatesFilter<"ScheduleGroup"> | string;
    capacity?: Prisma.IntWithAggregatesFilter<"ScheduleGroup"> | number;
    active?: Prisma.BoolWithAggregatesFilter<"ScheduleGroup"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ScheduleGroup"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"ScheduleGroup"> | Date | string;
};
export type ScheduleGroupCreateInput = {
    id?: string;
    name: string;
    startTime: string;
    endTime: string;
    capacity?: number;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    members?: Prisma.MemberCreateNestedManyWithoutScheduleGroupInput;
};
export type ScheduleGroupUncheckedCreateInput = {
    id?: string;
    name: string;
    startTime: string;
    endTime: string;
    capacity?: number;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    members?: Prisma.MemberUncheckedCreateNestedManyWithoutScheduleGroupInput;
};
export type ScheduleGroupUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    startTime?: Prisma.StringFieldUpdateOperationsInput | string;
    endTime?: Prisma.StringFieldUpdateOperationsInput | string;
    capacity?: Prisma.IntFieldUpdateOperationsInput | number;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    members?: Prisma.MemberUpdateManyWithoutScheduleGroupNestedInput;
};
export type ScheduleGroupUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    startTime?: Prisma.StringFieldUpdateOperationsInput | string;
    endTime?: Prisma.StringFieldUpdateOperationsInput | string;
    capacity?: Prisma.IntFieldUpdateOperationsInput | number;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    members?: Prisma.MemberUncheckedUpdateManyWithoutScheduleGroupNestedInput;
};
export type ScheduleGroupCreateManyInput = {
    id?: string;
    name: string;
    startTime: string;
    endTime: string;
    capacity?: number;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ScheduleGroupUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    startTime?: Prisma.StringFieldUpdateOperationsInput | string;
    endTime?: Prisma.StringFieldUpdateOperationsInput | string;
    capacity?: Prisma.IntFieldUpdateOperationsInput | number;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ScheduleGroupUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    startTime?: Prisma.StringFieldUpdateOperationsInput | string;
    endTime?: Prisma.StringFieldUpdateOperationsInput | string;
    capacity?: Prisma.IntFieldUpdateOperationsInput | number;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ScheduleGroupNullableScalarRelationFilter = {
    is?: Prisma.ScheduleGroupWhereInput | null;
    isNot?: Prisma.ScheduleGroupWhereInput | null;
};
export type ScheduleGroupCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    startTime?: Prisma.SortOrder;
    endTime?: Prisma.SortOrder;
    capacity?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ScheduleGroupAvgOrderByAggregateInput = {
    capacity?: Prisma.SortOrder;
};
export type ScheduleGroupMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    startTime?: Prisma.SortOrder;
    endTime?: Prisma.SortOrder;
    capacity?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ScheduleGroupMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    startTime?: Prisma.SortOrder;
    endTime?: Prisma.SortOrder;
    capacity?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ScheduleGroupSumOrderByAggregateInput = {
    capacity?: Prisma.SortOrder;
};
export type ScheduleGroupCreateNestedOneWithoutMembersInput = {
    create?: Prisma.XOR<Prisma.ScheduleGroupCreateWithoutMembersInput, Prisma.ScheduleGroupUncheckedCreateWithoutMembersInput>;
    connectOrCreate?: Prisma.ScheduleGroupCreateOrConnectWithoutMembersInput;
    connect?: Prisma.ScheduleGroupWhereUniqueInput;
};
export type ScheduleGroupUpdateOneWithoutMembersNestedInput = {
    create?: Prisma.XOR<Prisma.ScheduleGroupCreateWithoutMembersInput, Prisma.ScheduleGroupUncheckedCreateWithoutMembersInput>;
    connectOrCreate?: Prisma.ScheduleGroupCreateOrConnectWithoutMembersInput;
    upsert?: Prisma.ScheduleGroupUpsertWithoutMembersInput;
    disconnect?: Prisma.ScheduleGroupWhereInput | boolean;
    delete?: Prisma.ScheduleGroupWhereInput | boolean;
    connect?: Prisma.ScheduleGroupWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ScheduleGroupUpdateToOneWithWhereWithoutMembersInput, Prisma.ScheduleGroupUpdateWithoutMembersInput>, Prisma.ScheduleGroupUncheckedUpdateWithoutMembersInput>;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type ScheduleGroupCreateWithoutMembersInput = {
    id?: string;
    name: string;
    startTime: string;
    endTime: string;
    capacity?: number;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ScheduleGroupUncheckedCreateWithoutMembersInput = {
    id?: string;
    name: string;
    startTime: string;
    endTime: string;
    capacity?: number;
    active?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ScheduleGroupCreateOrConnectWithoutMembersInput = {
    where: Prisma.ScheduleGroupWhereUniqueInput;
    create: Prisma.XOR<Prisma.ScheduleGroupCreateWithoutMembersInput, Prisma.ScheduleGroupUncheckedCreateWithoutMembersInput>;
};
export type ScheduleGroupUpsertWithoutMembersInput = {
    update: Prisma.XOR<Prisma.ScheduleGroupUpdateWithoutMembersInput, Prisma.ScheduleGroupUncheckedUpdateWithoutMembersInput>;
    create: Prisma.XOR<Prisma.ScheduleGroupCreateWithoutMembersInput, Prisma.ScheduleGroupUncheckedCreateWithoutMembersInput>;
    where?: Prisma.ScheduleGroupWhereInput;
};
export type ScheduleGroupUpdateToOneWithWhereWithoutMembersInput = {
    where?: Prisma.ScheduleGroupWhereInput;
    data: Prisma.XOR<Prisma.ScheduleGroupUpdateWithoutMembersInput, Prisma.ScheduleGroupUncheckedUpdateWithoutMembersInput>;
};
export type ScheduleGroupUpdateWithoutMembersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    startTime?: Prisma.StringFieldUpdateOperationsInput | string;
    endTime?: Prisma.StringFieldUpdateOperationsInput | string;
    capacity?: Prisma.IntFieldUpdateOperationsInput | number;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ScheduleGroupUncheckedUpdateWithoutMembersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    startTime?: Prisma.StringFieldUpdateOperationsInput | string;
    endTime?: Prisma.StringFieldUpdateOperationsInput | string;
    capacity?: Prisma.IntFieldUpdateOperationsInput | number;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ScheduleGroupCountOutputType = {
    members: number;
};
export type ScheduleGroupCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    members?: boolean | ScheduleGroupCountOutputTypeCountMembersArgs;
};
export type ScheduleGroupCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ScheduleGroupCountOutputTypeSelect<ExtArgs> | null;
};
export type ScheduleGroupCountOutputTypeCountMembersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MemberWhereInput;
};
export type ScheduleGroupSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    startTime?: boolean;
    endTime?: boolean;
    capacity?: boolean;
    active?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    members?: boolean | Prisma.ScheduleGroup$membersArgs<ExtArgs>;
    _count?: boolean | Prisma.ScheduleGroupCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["scheduleGroup"]>;
export type ScheduleGroupSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    startTime?: boolean;
    endTime?: boolean;
    capacity?: boolean;
    active?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["scheduleGroup"]>;
export type ScheduleGroupSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    startTime?: boolean;
    endTime?: boolean;
    capacity?: boolean;
    active?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["scheduleGroup"]>;
export type ScheduleGroupSelectScalar = {
    id?: boolean;
    name?: boolean;
    startTime?: boolean;
    endTime?: boolean;
    capacity?: boolean;
    active?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ScheduleGroupOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "startTime" | "endTime" | "capacity" | "active" | "createdAt" | "updatedAt", ExtArgs["result"]["scheduleGroup"]>;
export type ScheduleGroupInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    members?: boolean | Prisma.ScheduleGroup$membersArgs<ExtArgs>;
    _count?: boolean | Prisma.ScheduleGroupCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ScheduleGroupIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type ScheduleGroupIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $ScheduleGroupPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ScheduleGroup";
    objects: {
        members: Prisma.$MemberPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        startTime: string;
        endTime: string;
        capacity: number;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["scheduleGroup"]>;
    composites: {};
};
export type ScheduleGroupGetPayload<S extends boolean | null | undefined | ScheduleGroupDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ScheduleGroupPayload, S>;
export type ScheduleGroupCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ScheduleGroupFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ScheduleGroupCountAggregateInputType | true;
};
export interface ScheduleGroupDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ScheduleGroup'];
        meta: {
            name: 'ScheduleGroup';
        };
    };
    findUnique<T extends ScheduleGroupFindUniqueArgs>(args: Prisma.SelectSubset<T, ScheduleGroupFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ScheduleGroupClient<runtime.Types.Result.GetResult<Prisma.$ScheduleGroupPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ScheduleGroupFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ScheduleGroupFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ScheduleGroupClient<runtime.Types.Result.GetResult<Prisma.$ScheduleGroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ScheduleGroupFindFirstArgs>(args?: Prisma.SelectSubset<T, ScheduleGroupFindFirstArgs<ExtArgs>>): Prisma.Prisma__ScheduleGroupClient<runtime.Types.Result.GetResult<Prisma.$ScheduleGroupPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ScheduleGroupFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ScheduleGroupFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ScheduleGroupClient<runtime.Types.Result.GetResult<Prisma.$ScheduleGroupPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ScheduleGroupFindManyArgs>(args?: Prisma.SelectSubset<T, ScheduleGroupFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ScheduleGroupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ScheduleGroupCreateArgs>(args: Prisma.SelectSubset<T, ScheduleGroupCreateArgs<ExtArgs>>): Prisma.Prisma__ScheduleGroupClient<runtime.Types.Result.GetResult<Prisma.$ScheduleGroupPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ScheduleGroupCreateManyArgs>(args?: Prisma.SelectSubset<T, ScheduleGroupCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ScheduleGroupCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ScheduleGroupCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ScheduleGroupPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ScheduleGroupDeleteArgs>(args: Prisma.SelectSubset<T, ScheduleGroupDeleteArgs<ExtArgs>>): Prisma.Prisma__ScheduleGroupClient<runtime.Types.Result.GetResult<Prisma.$ScheduleGroupPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ScheduleGroupUpdateArgs>(args: Prisma.SelectSubset<T, ScheduleGroupUpdateArgs<ExtArgs>>): Prisma.Prisma__ScheduleGroupClient<runtime.Types.Result.GetResult<Prisma.$ScheduleGroupPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ScheduleGroupDeleteManyArgs>(args?: Prisma.SelectSubset<T, ScheduleGroupDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ScheduleGroupUpdateManyArgs>(args: Prisma.SelectSubset<T, ScheduleGroupUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ScheduleGroupUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ScheduleGroupUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ScheduleGroupPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ScheduleGroupUpsertArgs>(args: Prisma.SelectSubset<T, ScheduleGroupUpsertArgs<ExtArgs>>): Prisma.Prisma__ScheduleGroupClient<runtime.Types.Result.GetResult<Prisma.$ScheduleGroupPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ScheduleGroupCountArgs>(args?: Prisma.Subset<T, ScheduleGroupCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ScheduleGroupCountAggregateOutputType> : number>;
    aggregate<T extends ScheduleGroupAggregateArgs>(args: Prisma.Subset<T, ScheduleGroupAggregateArgs>): Prisma.PrismaPromise<GetScheduleGroupAggregateType<T>>;
    groupBy<T extends ScheduleGroupGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ScheduleGroupGroupByArgs['orderBy'];
    } : {
        orderBy?: ScheduleGroupGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ScheduleGroupGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetScheduleGroupGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ScheduleGroupFieldRefs;
}
export interface Prisma__ScheduleGroupClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    members<T extends Prisma.ScheduleGroup$membersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ScheduleGroup$membersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ScheduleGroupFieldRefs {
    readonly id: Prisma.FieldRef<"ScheduleGroup", 'String'>;
    readonly name: Prisma.FieldRef<"ScheduleGroup", 'String'>;
    readonly startTime: Prisma.FieldRef<"ScheduleGroup", 'String'>;
    readonly endTime: Prisma.FieldRef<"ScheduleGroup", 'String'>;
    readonly capacity: Prisma.FieldRef<"ScheduleGroup", 'Int'>;
    readonly active: Prisma.FieldRef<"ScheduleGroup", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"ScheduleGroup", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"ScheduleGroup", 'DateTime'>;
}
export type ScheduleGroupFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ScheduleGroupSelect<ExtArgs> | null;
    omit?: Prisma.ScheduleGroupOmit<ExtArgs> | null;
    include?: Prisma.ScheduleGroupInclude<ExtArgs> | null;
    where: Prisma.ScheduleGroupWhereUniqueInput;
};
export type ScheduleGroupFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ScheduleGroupSelect<ExtArgs> | null;
    omit?: Prisma.ScheduleGroupOmit<ExtArgs> | null;
    include?: Prisma.ScheduleGroupInclude<ExtArgs> | null;
    where: Prisma.ScheduleGroupWhereUniqueInput;
};
export type ScheduleGroupFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ScheduleGroupSelect<ExtArgs> | null;
    omit?: Prisma.ScheduleGroupOmit<ExtArgs> | null;
    include?: Prisma.ScheduleGroupInclude<ExtArgs> | null;
    where?: Prisma.ScheduleGroupWhereInput;
    orderBy?: Prisma.ScheduleGroupOrderByWithRelationInput | Prisma.ScheduleGroupOrderByWithRelationInput[];
    cursor?: Prisma.ScheduleGroupWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ScheduleGroupScalarFieldEnum | Prisma.ScheduleGroupScalarFieldEnum[];
};
export type ScheduleGroupFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ScheduleGroupSelect<ExtArgs> | null;
    omit?: Prisma.ScheduleGroupOmit<ExtArgs> | null;
    include?: Prisma.ScheduleGroupInclude<ExtArgs> | null;
    where?: Prisma.ScheduleGroupWhereInput;
    orderBy?: Prisma.ScheduleGroupOrderByWithRelationInput | Prisma.ScheduleGroupOrderByWithRelationInput[];
    cursor?: Prisma.ScheduleGroupWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ScheduleGroupScalarFieldEnum | Prisma.ScheduleGroupScalarFieldEnum[];
};
export type ScheduleGroupFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ScheduleGroupSelect<ExtArgs> | null;
    omit?: Prisma.ScheduleGroupOmit<ExtArgs> | null;
    include?: Prisma.ScheduleGroupInclude<ExtArgs> | null;
    where?: Prisma.ScheduleGroupWhereInput;
    orderBy?: Prisma.ScheduleGroupOrderByWithRelationInput | Prisma.ScheduleGroupOrderByWithRelationInput[];
    cursor?: Prisma.ScheduleGroupWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ScheduleGroupScalarFieldEnum | Prisma.ScheduleGroupScalarFieldEnum[];
};
export type ScheduleGroupCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ScheduleGroupSelect<ExtArgs> | null;
    omit?: Prisma.ScheduleGroupOmit<ExtArgs> | null;
    include?: Prisma.ScheduleGroupInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ScheduleGroupCreateInput, Prisma.ScheduleGroupUncheckedCreateInput>;
};
export type ScheduleGroupCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ScheduleGroupCreateManyInput | Prisma.ScheduleGroupCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ScheduleGroupCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ScheduleGroupSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ScheduleGroupOmit<ExtArgs> | null;
    data: Prisma.ScheduleGroupCreateManyInput | Prisma.ScheduleGroupCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ScheduleGroupUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ScheduleGroupSelect<ExtArgs> | null;
    omit?: Prisma.ScheduleGroupOmit<ExtArgs> | null;
    include?: Prisma.ScheduleGroupInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ScheduleGroupUpdateInput, Prisma.ScheduleGroupUncheckedUpdateInput>;
    where: Prisma.ScheduleGroupWhereUniqueInput;
};
export type ScheduleGroupUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ScheduleGroupUpdateManyMutationInput, Prisma.ScheduleGroupUncheckedUpdateManyInput>;
    where?: Prisma.ScheduleGroupWhereInput;
    limit?: number;
};
export type ScheduleGroupUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ScheduleGroupSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ScheduleGroupOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ScheduleGroupUpdateManyMutationInput, Prisma.ScheduleGroupUncheckedUpdateManyInput>;
    where?: Prisma.ScheduleGroupWhereInput;
    limit?: number;
};
export type ScheduleGroupUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ScheduleGroupSelect<ExtArgs> | null;
    omit?: Prisma.ScheduleGroupOmit<ExtArgs> | null;
    include?: Prisma.ScheduleGroupInclude<ExtArgs> | null;
    where: Prisma.ScheduleGroupWhereUniqueInput;
    create: Prisma.XOR<Prisma.ScheduleGroupCreateInput, Prisma.ScheduleGroupUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ScheduleGroupUpdateInput, Prisma.ScheduleGroupUncheckedUpdateInput>;
};
export type ScheduleGroupDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ScheduleGroupSelect<ExtArgs> | null;
    omit?: Prisma.ScheduleGroupOmit<ExtArgs> | null;
    include?: Prisma.ScheduleGroupInclude<ExtArgs> | null;
    where: Prisma.ScheduleGroupWhereUniqueInput;
};
export type ScheduleGroupDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ScheduleGroupWhereInput;
    limit?: number;
};
export type ScheduleGroup$membersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ScheduleGroupDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ScheduleGroupSelect<ExtArgs> | null;
    omit?: Prisma.ScheduleGroupOmit<ExtArgs> | null;
    include?: Prisma.ScheduleGroupInclude<ExtArgs> | null;
};
