import express, { NextFunction, Request, Response } from 'express'
import { logger } from './config/logger';
import { errorHandler } from './lib/middleware/errorHandler';
import { logRequest } from './lib/middleware/logRequest';
import cors from 'cors';
import { APIError } from './lib/APIError';
import { authController } from './controllers/auth.controller';
import { notesController } from './controllers/notes.controller';

export const app = express();

// middleware
app.use(cors())
app.use(express.json())
app.use(logRequest({ logFunction: (str) => { logger.info(str) }, logBody: false }))

//health endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: "healthy" })
})

//register routes
app.use('/api/v1/auth', authController.getRouter());
app.use('/api/v1/notes', notesController.getRouter());

//404 handler
app.use((req, res) => {
  // throw new createHttpError.NotFound('route not found');
  throw APIError.notFound('route not found');
})

//log error
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err)
  next(err)
})

//handle error
app.use(errorHandler())



