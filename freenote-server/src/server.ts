import 'make-promises-safe'
import { config } from 'dotenv';
config()
import { app } from './app';
import { logger } from './config/logger';
import { config as appConfig } from './config/config'

app.listen(appConfig.env.port, () => {
  logger.info(`sever started on port ${appConfig.env.port}`)
})
