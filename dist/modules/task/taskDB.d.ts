import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    description: string;
    user_id: mongoose.Types.ObjectId;
    title?: string | null;
    status?: "done" | "important" | "crucial" | "basic" | null;
    dueDate?: NativeDate | null;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    description: string;
    user_id: mongoose.Types.ObjectId;
    title?: string | null;
    status?: "done" | "important" | "crucial" | "basic" | null;
    dueDate?: NativeDate | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    description: string;
    user_id: mongoose.Types.ObjectId;
    title?: string | null;
    status?: "done" | "important" | "crucial" | "basic" | null;
    dueDate?: NativeDate | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    description: string;
    user_id: mongoose.Types.ObjectId;
    title?: string | null;
    status?: "done" | "important" | "crucial" | "basic" | null;
    dueDate?: NativeDate | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    description: string;
    user_id: mongoose.Types.ObjectId;
    title?: string | null;
    status?: "done" | "important" | "crucial" | "basic" | null;
    dueDate?: NativeDate | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & Omit<{
    description: string;
    user_id: mongoose.Types.ObjectId;
    title?: string | null;
    status?: "done" | "important" | "crucial" | "basic" | null;
    dueDate?: NativeDate | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    [path: string]: mongoose.SchemaDefinitionProperty<undefined, any, any>;
} | {
    [x: string]: mongoose.SchemaDefinitionProperty<any, any, mongoose.Document<unknown, {}, {
        description: string;
        user_id: mongoose.Types.ObjectId;
        title?: string | null;
        status?: "done" | "important" | "crucial" | "basic" | null;
        dueDate?: NativeDate | null;
    } & mongoose.DefaultTimestampProps, {
        id: string;
    }, mongoose.ResolveSchemaOptions<{
        timestamps: true;
    }>> & Omit<{
        description: string;
        user_id: mongoose.Types.ObjectId;
        title?: string | null;
        status?: "done" | "important" | "crucial" | "basic" | null;
        dueDate?: NativeDate | null;
    } & mongoose.DefaultTimestampProps & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    description: string;
    user_id: mongoose.Types.ObjectId;
    title?: string | null;
    status?: "done" | "important" | "crucial" | "basic" | null;
    dueDate?: NativeDate | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    description: string;
    user_id: mongoose.Types.ObjectId;
    title?: string | null;
    status?: "done" | "important" | "crucial" | "basic" | null;
    dueDate?: NativeDate | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default _default;
//# sourceMappingURL=taskDB.d.ts.map