import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type AuthSessionModel = runtime.Types.Result.DefaultSelection<Prisma.$AuthSessionPayload>;
export type AggregateAuthSession = {
    _count: AuthSessionCountAggregateOutputType | null;
    _min: AuthSessionMinAggregateOutputType | null;
    _max: AuthSessionMaxAggregateOutputType | null;
};
export type AuthSessionMinAggregateOutputType = {
    id: string | null;
    tokenHash: string | null;
    userId: string | null;
    expiresAt: Date | null;
    createdAt: Date | null;
};
export type AuthSessionMaxAggregateOutputType = {
    id: string | null;
    tokenHash: string | null;
    userId: string | null;
    expiresAt: Date | null;
    createdAt: Date | null;
};
export type AuthSessionCountAggregateOutputType = {
    id: number;
    tokenHash: number;
    userId: number;
    expiresAt: number;
    createdAt: number;
    _all: number;
};
export type AuthSessionMinAggregateInputType = {
    id?: true;
    tokenHash?: true;
    userId?: true;
    expiresAt?: true;
    createdAt?: true;
};
export type AuthSessionMaxAggregateInputType = {
    id?: true;
    tokenHash?: true;
    userId?: true;
    expiresAt?: true;
    createdAt?: true;
};
export type AuthSessionCountAggregateInputType = {
    id?: true;
    tokenHash?: true;
    userId?: true;
    expiresAt?: true;
    createdAt?: true;
    _all?: true;
};
export type AuthSessionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AuthSessionWhereInput;
    orderBy?: Prisma.AuthSessionOrderByWithRelationInput | Prisma.AuthSessionOrderByWithRelationInput[];
    cursor?: Prisma.AuthSessionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | AuthSessionCountAggregateInputType;
    _min?: AuthSessionMinAggregateInputType;
    _max?: AuthSessionMaxAggregateInputType;
};
export type GetAuthSessionAggregateType<T extends AuthSessionAggregateArgs> = {
    [P in keyof T & keyof AggregateAuthSession]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAuthSession[P]> : Prisma.GetScalarType<T[P], AggregateAuthSession[P]>;
};
export type AuthSessionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AuthSessionWhereInput;
    orderBy?: Prisma.AuthSessionOrderByWithAggregationInput | Prisma.AuthSessionOrderByWithAggregationInput[];
    by: Prisma.AuthSessionScalarFieldEnum[] | Prisma.AuthSessionScalarFieldEnum;
    having?: Prisma.AuthSessionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AuthSessionCountAggregateInputType | true;
    _min?: AuthSessionMinAggregateInputType;
    _max?: AuthSessionMaxAggregateInputType;
};
export type AuthSessionGroupByOutputType = {
    id: string;
    tokenHash: string;
    userId: string;
    expiresAt: Date;
    createdAt: Date;
    _count: AuthSessionCountAggregateOutputType | null;
    _min: AuthSessionMinAggregateOutputType | null;
    _max: AuthSessionMaxAggregateOutputType | null;
};
export type GetAuthSessionGroupByPayload<T extends AuthSessionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AuthSessionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AuthSessionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AuthSessionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AuthSessionGroupByOutputType[P]>;
}>>;
export type AuthSessionWhereInput = {
    AND?: Prisma.AuthSessionWhereInput | Prisma.AuthSessionWhereInput[];
    OR?: Prisma.AuthSessionWhereInput[];
    NOT?: Prisma.AuthSessionWhereInput | Prisma.AuthSessionWhereInput[];
    id?: Prisma.StringFilter<"AuthSession"> | string;
    tokenHash?: Prisma.StringFilter<"AuthSession"> | string;
    userId?: Prisma.StringFilter<"AuthSession"> | string;
    expiresAt?: Prisma.DateTimeFilter<"AuthSession"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"AuthSession"> | Date | string;
    user?: Prisma.XOR<Prisma.AdminUserScalarRelationFilter, Prisma.AdminUserWhereInput>;
};
export type AuthSessionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    tokenHash?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    user?: Prisma.AdminUserOrderByWithRelationInput;
};
export type AuthSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    tokenHash?: string;
    AND?: Prisma.AuthSessionWhereInput | Prisma.AuthSessionWhereInput[];
    OR?: Prisma.AuthSessionWhereInput[];
    NOT?: Prisma.AuthSessionWhereInput | Prisma.AuthSessionWhereInput[];
    userId?: Prisma.StringFilter<"AuthSession"> | string;
    expiresAt?: Prisma.DateTimeFilter<"AuthSession"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"AuthSession"> | Date | string;
    user?: Prisma.XOR<Prisma.AdminUserScalarRelationFilter, Prisma.AdminUserWhereInput>;
}, "id" | "tokenHash">;
export type AuthSessionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    tokenHash?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.AuthSessionCountOrderByAggregateInput;
    _max?: Prisma.AuthSessionMaxOrderByAggregateInput;
    _min?: Prisma.AuthSessionMinOrderByAggregateInput;
};
export type AuthSessionScalarWhereWithAggregatesInput = {
    AND?: Prisma.AuthSessionScalarWhereWithAggregatesInput | Prisma.AuthSessionScalarWhereWithAggregatesInput[];
    OR?: Prisma.AuthSessionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AuthSessionScalarWhereWithAggregatesInput | Prisma.AuthSessionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"AuthSession"> | string;
    tokenHash?: Prisma.StringWithAggregatesFilter<"AuthSession"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"AuthSession"> | string;
    expiresAt?: Prisma.DateTimeWithAggregatesFilter<"AuthSession"> | Date | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"AuthSession"> | Date | string;
};
export type AuthSessionCreateInput = {
    id?: string;
    tokenHash: string;
    expiresAt: Date | string;
    createdAt?: Date | string;
    user: Prisma.AdminUserCreateNestedOneWithoutSessionsInput;
};
export type AuthSessionUncheckedCreateInput = {
    id?: string;
    tokenHash: string;
    userId: string;
    expiresAt: Date | string;
    createdAt?: Date | string;
};
export type AuthSessionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.AdminUserUpdateOneRequiredWithoutSessionsNestedInput;
};
export type AuthSessionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AuthSessionCreateManyInput = {
    id?: string;
    tokenHash: string;
    userId: string;
    expiresAt: Date | string;
    createdAt?: Date | string;
};
export type AuthSessionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AuthSessionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AuthSessionListRelationFilter = {
    every?: Prisma.AuthSessionWhereInput;
    some?: Prisma.AuthSessionWhereInput;
    none?: Prisma.AuthSessionWhereInput;
};
export type AuthSessionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type AuthSessionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tokenHash?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AuthSessionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tokenHash?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AuthSessionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tokenHash?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AuthSessionCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.AuthSessionCreateWithoutUserInput, Prisma.AuthSessionUncheckedCreateWithoutUserInput> | Prisma.AuthSessionCreateWithoutUserInput[] | Prisma.AuthSessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AuthSessionCreateOrConnectWithoutUserInput | Prisma.AuthSessionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.AuthSessionCreateManyUserInputEnvelope;
    connect?: Prisma.AuthSessionWhereUniqueInput | Prisma.AuthSessionWhereUniqueInput[];
};
export type AuthSessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.AuthSessionCreateWithoutUserInput, Prisma.AuthSessionUncheckedCreateWithoutUserInput> | Prisma.AuthSessionCreateWithoutUserInput[] | Prisma.AuthSessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AuthSessionCreateOrConnectWithoutUserInput | Prisma.AuthSessionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.AuthSessionCreateManyUserInputEnvelope;
    connect?: Prisma.AuthSessionWhereUniqueInput | Prisma.AuthSessionWhereUniqueInput[];
};
export type AuthSessionUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.AuthSessionCreateWithoutUserInput, Prisma.AuthSessionUncheckedCreateWithoutUserInput> | Prisma.AuthSessionCreateWithoutUserInput[] | Prisma.AuthSessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AuthSessionCreateOrConnectWithoutUserInput | Prisma.AuthSessionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.AuthSessionUpsertWithWhereUniqueWithoutUserInput | Prisma.AuthSessionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.AuthSessionCreateManyUserInputEnvelope;
    set?: Prisma.AuthSessionWhereUniqueInput | Prisma.AuthSessionWhereUniqueInput[];
    disconnect?: Prisma.AuthSessionWhereUniqueInput | Prisma.AuthSessionWhereUniqueInput[];
    delete?: Prisma.AuthSessionWhereUniqueInput | Prisma.AuthSessionWhereUniqueInput[];
    connect?: Prisma.AuthSessionWhereUniqueInput | Prisma.AuthSessionWhereUniqueInput[];
    update?: Prisma.AuthSessionUpdateWithWhereUniqueWithoutUserInput | Prisma.AuthSessionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.AuthSessionUpdateManyWithWhereWithoutUserInput | Prisma.AuthSessionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.AuthSessionScalarWhereInput | Prisma.AuthSessionScalarWhereInput[];
};
export type AuthSessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.AuthSessionCreateWithoutUserInput, Prisma.AuthSessionUncheckedCreateWithoutUserInput> | Prisma.AuthSessionCreateWithoutUserInput[] | Prisma.AuthSessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AuthSessionCreateOrConnectWithoutUserInput | Prisma.AuthSessionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.AuthSessionUpsertWithWhereUniqueWithoutUserInput | Prisma.AuthSessionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.AuthSessionCreateManyUserInputEnvelope;
    set?: Prisma.AuthSessionWhereUniqueInput | Prisma.AuthSessionWhereUniqueInput[];
    disconnect?: Prisma.AuthSessionWhereUniqueInput | Prisma.AuthSessionWhereUniqueInput[];
    delete?: Prisma.AuthSessionWhereUniqueInput | Prisma.AuthSessionWhereUniqueInput[];
    connect?: Prisma.AuthSessionWhereUniqueInput | Prisma.AuthSessionWhereUniqueInput[];
    update?: Prisma.AuthSessionUpdateWithWhereUniqueWithoutUserInput | Prisma.AuthSessionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.AuthSessionUpdateManyWithWhereWithoutUserInput | Prisma.AuthSessionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.AuthSessionScalarWhereInput | Prisma.AuthSessionScalarWhereInput[];
};
export type AuthSessionCreateWithoutUserInput = {
    id?: string;
    tokenHash: string;
    expiresAt: Date | string;
    createdAt?: Date | string;
};
export type AuthSessionUncheckedCreateWithoutUserInput = {
    id?: string;
    tokenHash: string;
    expiresAt: Date | string;
    createdAt?: Date | string;
};
export type AuthSessionCreateOrConnectWithoutUserInput = {
    where: Prisma.AuthSessionWhereUniqueInput;
    create: Prisma.XOR<Prisma.AuthSessionCreateWithoutUserInput, Prisma.AuthSessionUncheckedCreateWithoutUserInput>;
};
export type AuthSessionCreateManyUserInputEnvelope = {
    data: Prisma.AuthSessionCreateManyUserInput | Prisma.AuthSessionCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type AuthSessionUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.AuthSessionWhereUniqueInput;
    update: Prisma.XOR<Prisma.AuthSessionUpdateWithoutUserInput, Prisma.AuthSessionUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.AuthSessionCreateWithoutUserInput, Prisma.AuthSessionUncheckedCreateWithoutUserInput>;
};
export type AuthSessionUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.AuthSessionWhereUniqueInput;
    data: Prisma.XOR<Prisma.AuthSessionUpdateWithoutUserInput, Prisma.AuthSessionUncheckedUpdateWithoutUserInput>;
};
export type AuthSessionUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.AuthSessionScalarWhereInput;
    data: Prisma.XOR<Prisma.AuthSessionUpdateManyMutationInput, Prisma.AuthSessionUncheckedUpdateManyWithoutUserInput>;
};
export type AuthSessionScalarWhereInput = {
    AND?: Prisma.AuthSessionScalarWhereInput | Prisma.AuthSessionScalarWhereInput[];
    OR?: Prisma.AuthSessionScalarWhereInput[];
    NOT?: Prisma.AuthSessionScalarWhereInput | Prisma.AuthSessionScalarWhereInput[];
    id?: Prisma.StringFilter<"AuthSession"> | string;
    tokenHash?: Prisma.StringFilter<"AuthSession"> | string;
    userId?: Prisma.StringFilter<"AuthSession"> | string;
    expiresAt?: Prisma.DateTimeFilter<"AuthSession"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"AuthSession"> | Date | string;
};
export type AuthSessionCreateManyUserInput = {
    id?: string;
    tokenHash: string;
    expiresAt: Date | string;
    createdAt?: Date | string;
};
export type AuthSessionUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AuthSessionUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AuthSessionUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AuthSessionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tokenHash?: boolean;
    userId?: boolean;
    expiresAt?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.AdminUserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["authSession"]>;
export type AuthSessionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tokenHash?: boolean;
    userId?: boolean;
    expiresAt?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.AdminUserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["authSession"]>;
export type AuthSessionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tokenHash?: boolean;
    userId?: boolean;
    expiresAt?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.AdminUserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["authSession"]>;
export type AuthSessionSelectScalar = {
    id?: boolean;
    tokenHash?: boolean;
    userId?: boolean;
    expiresAt?: boolean;
    createdAt?: boolean;
};
export type AuthSessionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tokenHash" | "userId" | "expiresAt" | "createdAt", ExtArgs["result"]["authSession"]>;
export type AuthSessionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.AdminUserDefaultArgs<ExtArgs>;
};
export type AuthSessionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.AdminUserDefaultArgs<ExtArgs>;
};
export type AuthSessionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.AdminUserDefaultArgs<ExtArgs>;
};
export type $AuthSessionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "AuthSession";
    objects: {
        user: Prisma.$AdminUserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        tokenHash: string;
        userId: string;
        expiresAt: Date;
        createdAt: Date;
    }, ExtArgs["result"]["authSession"]>;
    composites: {};
};
export type AuthSessionGetPayload<S extends boolean | null | undefined | AuthSessionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AuthSessionPayload, S>;
export type AuthSessionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AuthSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AuthSessionCountAggregateInputType | true;
};
export interface AuthSessionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['AuthSession'];
        meta: {
            name: 'AuthSession';
        };
    };
    findUnique<T extends AuthSessionFindUniqueArgs>(args: Prisma.SelectSubset<T, AuthSessionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AuthSessionClient<runtime.Types.Result.GetResult<Prisma.$AuthSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends AuthSessionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AuthSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AuthSessionClient<runtime.Types.Result.GetResult<Prisma.$AuthSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends AuthSessionFindFirstArgs>(args?: Prisma.SelectSubset<T, AuthSessionFindFirstArgs<ExtArgs>>): Prisma.Prisma__AuthSessionClient<runtime.Types.Result.GetResult<Prisma.$AuthSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends AuthSessionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AuthSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AuthSessionClient<runtime.Types.Result.GetResult<Prisma.$AuthSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends AuthSessionFindManyArgs>(args?: Prisma.SelectSubset<T, AuthSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AuthSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends AuthSessionCreateArgs>(args: Prisma.SelectSubset<T, AuthSessionCreateArgs<ExtArgs>>): Prisma.Prisma__AuthSessionClient<runtime.Types.Result.GetResult<Prisma.$AuthSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends AuthSessionCreateManyArgs>(args?: Prisma.SelectSubset<T, AuthSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends AuthSessionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AuthSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AuthSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends AuthSessionDeleteArgs>(args: Prisma.SelectSubset<T, AuthSessionDeleteArgs<ExtArgs>>): Prisma.Prisma__AuthSessionClient<runtime.Types.Result.GetResult<Prisma.$AuthSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends AuthSessionUpdateArgs>(args: Prisma.SelectSubset<T, AuthSessionUpdateArgs<ExtArgs>>): Prisma.Prisma__AuthSessionClient<runtime.Types.Result.GetResult<Prisma.$AuthSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends AuthSessionDeleteManyArgs>(args?: Prisma.SelectSubset<T, AuthSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends AuthSessionUpdateManyArgs>(args: Prisma.SelectSubset<T, AuthSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends AuthSessionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AuthSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AuthSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends AuthSessionUpsertArgs>(args: Prisma.SelectSubset<T, AuthSessionUpsertArgs<ExtArgs>>): Prisma.Prisma__AuthSessionClient<runtime.Types.Result.GetResult<Prisma.$AuthSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends AuthSessionCountArgs>(args?: Prisma.Subset<T, AuthSessionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AuthSessionCountAggregateOutputType> : number>;
    aggregate<T extends AuthSessionAggregateArgs>(args: Prisma.Subset<T, AuthSessionAggregateArgs>): Prisma.PrismaPromise<GetAuthSessionAggregateType<T>>;
    groupBy<T extends AuthSessionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AuthSessionGroupByArgs['orderBy'];
    } : {
        orderBy?: AuthSessionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AuthSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuthSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: AuthSessionFieldRefs;
}
export interface Prisma__AuthSessionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.AdminUserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AdminUserDefaultArgs<ExtArgs>>): Prisma.Prisma__AdminUserClient<runtime.Types.Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface AuthSessionFieldRefs {
    readonly id: Prisma.FieldRef<"AuthSession", 'String'>;
    readonly tokenHash: Prisma.FieldRef<"AuthSession", 'String'>;
    readonly userId: Prisma.FieldRef<"AuthSession", 'String'>;
    readonly expiresAt: Prisma.FieldRef<"AuthSession", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"AuthSession", 'DateTime'>;
}
export type AuthSessionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuthSessionSelect<ExtArgs> | null;
    omit?: Prisma.AuthSessionOmit<ExtArgs> | null;
    include?: Prisma.AuthSessionInclude<ExtArgs> | null;
    where: Prisma.AuthSessionWhereUniqueInput;
};
export type AuthSessionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuthSessionSelect<ExtArgs> | null;
    omit?: Prisma.AuthSessionOmit<ExtArgs> | null;
    include?: Prisma.AuthSessionInclude<ExtArgs> | null;
    where: Prisma.AuthSessionWhereUniqueInput;
};
export type AuthSessionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuthSessionSelect<ExtArgs> | null;
    omit?: Prisma.AuthSessionOmit<ExtArgs> | null;
    include?: Prisma.AuthSessionInclude<ExtArgs> | null;
    where?: Prisma.AuthSessionWhereInput;
    orderBy?: Prisma.AuthSessionOrderByWithRelationInput | Prisma.AuthSessionOrderByWithRelationInput[];
    cursor?: Prisma.AuthSessionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AuthSessionScalarFieldEnum | Prisma.AuthSessionScalarFieldEnum[];
};
export type AuthSessionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuthSessionSelect<ExtArgs> | null;
    omit?: Prisma.AuthSessionOmit<ExtArgs> | null;
    include?: Prisma.AuthSessionInclude<ExtArgs> | null;
    where?: Prisma.AuthSessionWhereInput;
    orderBy?: Prisma.AuthSessionOrderByWithRelationInput | Prisma.AuthSessionOrderByWithRelationInput[];
    cursor?: Prisma.AuthSessionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AuthSessionScalarFieldEnum | Prisma.AuthSessionScalarFieldEnum[];
};
export type AuthSessionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuthSessionSelect<ExtArgs> | null;
    omit?: Prisma.AuthSessionOmit<ExtArgs> | null;
    include?: Prisma.AuthSessionInclude<ExtArgs> | null;
    where?: Prisma.AuthSessionWhereInput;
    orderBy?: Prisma.AuthSessionOrderByWithRelationInput | Prisma.AuthSessionOrderByWithRelationInput[];
    cursor?: Prisma.AuthSessionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AuthSessionScalarFieldEnum | Prisma.AuthSessionScalarFieldEnum[];
};
export type AuthSessionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuthSessionSelect<ExtArgs> | null;
    omit?: Prisma.AuthSessionOmit<ExtArgs> | null;
    include?: Prisma.AuthSessionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AuthSessionCreateInput, Prisma.AuthSessionUncheckedCreateInput>;
};
export type AuthSessionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.AuthSessionCreateManyInput | Prisma.AuthSessionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type AuthSessionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuthSessionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AuthSessionOmit<ExtArgs> | null;
    data: Prisma.AuthSessionCreateManyInput | Prisma.AuthSessionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.AuthSessionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type AuthSessionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuthSessionSelect<ExtArgs> | null;
    omit?: Prisma.AuthSessionOmit<ExtArgs> | null;
    include?: Prisma.AuthSessionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AuthSessionUpdateInput, Prisma.AuthSessionUncheckedUpdateInput>;
    where: Prisma.AuthSessionWhereUniqueInput;
};
export type AuthSessionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.AuthSessionUpdateManyMutationInput, Prisma.AuthSessionUncheckedUpdateManyInput>;
    where?: Prisma.AuthSessionWhereInput;
    limit?: number;
};
export type AuthSessionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuthSessionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AuthSessionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AuthSessionUpdateManyMutationInput, Prisma.AuthSessionUncheckedUpdateManyInput>;
    where?: Prisma.AuthSessionWhereInput;
    limit?: number;
    include?: Prisma.AuthSessionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type AuthSessionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuthSessionSelect<ExtArgs> | null;
    omit?: Prisma.AuthSessionOmit<ExtArgs> | null;
    include?: Prisma.AuthSessionInclude<ExtArgs> | null;
    where: Prisma.AuthSessionWhereUniqueInput;
    create: Prisma.XOR<Prisma.AuthSessionCreateInput, Prisma.AuthSessionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.AuthSessionUpdateInput, Prisma.AuthSessionUncheckedUpdateInput>;
};
export type AuthSessionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuthSessionSelect<ExtArgs> | null;
    omit?: Prisma.AuthSessionOmit<ExtArgs> | null;
    include?: Prisma.AuthSessionInclude<ExtArgs> | null;
    where: Prisma.AuthSessionWhereUniqueInput;
};
export type AuthSessionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AuthSessionWhereInput;
    limit?: number;
};
export type AuthSessionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuthSessionSelect<ExtArgs> | null;
    omit?: Prisma.AuthSessionOmit<ExtArgs> | null;
    include?: Prisma.AuthSessionInclude<ExtArgs> | null;
};
