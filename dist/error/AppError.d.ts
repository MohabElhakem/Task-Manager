declare class AppError extends Error {
    statusCode: number;
    isOpertaional: boolean;
    constructor(message: string, statusCode: number);
}
export default AppError;
//# sourceMappingURL=AppError.d.ts.map