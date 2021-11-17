import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';

interface customError extends Error {
  statusCode?: number,
  code?: string,
}

export function errorHandler(): ErrorRequestHandler {
  return function (err: customError, req: Request, res: Response, next: NextFunction) {
    let statusCode = 500;
    let message = "something went wrong";
    let code = "ERROR";
    if (err.statusCode) {
      statusCode = err.statusCode;
      message = err.message;
    }
    if (err.statusCode && err.code) {
      code = err.code;
    }
    const errResp = {
      statusCode,
      message,
      code
    }
    return res.status(statusCode).json({
      errors: [
        errResp
      ]
    })

  }
}