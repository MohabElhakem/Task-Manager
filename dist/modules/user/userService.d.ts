/**
 * get_by_id:
 *  - to seacrh the user by id from the DB
 *  - needs only the id
 *
 * Returns :
 *      |
 *      |-> the user object fromt the DB
 *
 */
declare const index: {
    creat_user_in_DB: (username: string, email: string, password: string) => Promise<{
        userId: string;
        username: string;
        email: string;
    }>;
    get_by_id: (userId: string) => Promise<import("mongoose").Document<unknown, {}, {
        username: string;
        email: string;
        password: string;
        isActive: boolean;
    } & import("mongoose").DefaultTimestampProps, {
        id: string;
    }, {
        timestamps: true;
    }> & Omit<{
        username: string;
        email: string;
        password: string;
        isActive: boolean;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
};
export default index;
//# sourceMappingURL=userService.d.ts.map