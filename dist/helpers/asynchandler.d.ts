import type { Request, Response, NextFunction } from 'express';
type AsyncFn = (req: Request, res: Response, next: NextFunction) => Promise<any>;
declare const asyncHandler: (fn: AsyncFn) => (req: Request, res: Response, next: NextFunction) => Promise<any>;
export default asyncHandler;
//# sourceMappingURL=asynchandler.d.ts.map