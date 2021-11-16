import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import { APIError } from '../APIError';

export function errorHandler(): ErrorRequestHandler {
  return function (err: APIError, req: Request, res: Response, next: NextFunction) {
    let statusCode = 500;
    let message = "something went wrong";
    let code = APIError.codes.internalServerError;
    if (err.statusCode) {
      statusCode = err.statusCode;
      message = err.message;
    }
    if (err.code) {
      code = err.code;
    }
    return res.status(statusCode).json({
      errors: [
        {
          statusCode,
          message,
          code
        }
      ]
    })

  }
}