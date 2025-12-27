import type { Request, Response, NextFunction } from "express";
declare const globalErrorHandler: (err: unknown, req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>>;
export default globalErrorHandler;
//# sourceMappingURL=ErrorHandler.d.ts.map