import { Request, Response, NextFunction, Handler } from 'express'

export function logRequest({ logFunction, logBody }: { logFunction?: (logStr: string) => any, logBody?: boolean }): Handler {
  logFunction = logFunction || console.log;

  return function log(req, res, next): void {
    if (logBody) {
      console.log(req.body);
    }
    const start = Date.now();
    const url = req.url;
    res.on('close', function () {
      const end = Date.now();
      const logString = `${req.method} ${url} ${res.statusCode} - ${end - start}ms`
      if (logFunction) {
        logFunction(logString)
      }
    })
    next()
  }

}