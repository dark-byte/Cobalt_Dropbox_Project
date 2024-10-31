import { Request, Response, NextFunction, RequestHandler } from 'express';

// Define `asyncHandler` to accept functions with Express's `RequestHandler` signature
export const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>): RequestHandler => 
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};