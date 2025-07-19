import { Request, Response, NextFunction } from 'express';
import { ZodType, ZodError } from 'zod';

export function validateSchema<T>(schema: ZodType<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const error = result.error as ZodError<T>;
      return res.status(400).json({ errors: error.issues[0].message });
    }
    req.body = result.data;
    next();
  };
}
