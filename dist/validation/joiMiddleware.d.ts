import type { RequestHandler } from "express";
import type { ObjectSchema } from "joi";
declare const validate: (schema: ObjectSchema, property?: "body" | "query" | "params") => RequestHandler;
export default validate;
//# sourceMappingURL=joiMiddleware.d.ts.map