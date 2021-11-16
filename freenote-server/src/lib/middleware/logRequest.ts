import { Request, Response, NextFunction, Handler } from 'express'

export function logRequest({ logFunction }: { logFunction?: (logStr: string) => any }): Handler {
  logFunction = logFunction || console.log;

  return function log(req, res, next): void {
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