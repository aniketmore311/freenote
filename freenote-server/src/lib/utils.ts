import { Handler, NextFunction, Request, Response } from "express";

export function catchAsync(fn: (req: Request, res: Response, next?: NextFunction) => Promise<any>): Handler {
  return function (req: Request, res: Response, next: NextFunction) {
    fn(req, res, next).catch(err => { next(err) })
  }
}

export function getEnv(key: string, defaultValue?: string): string {
  const val = process.env[key];
  if (val === undefined) {
    if (defaultValue === undefined) {
      throw new Error(`environment variable ${key} not found`);
    }
    else {
      process.env[key] = defaultValue;
      return defaultValue;
    }
  }
  return val;
}