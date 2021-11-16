import pino from 'pino'

export const logger = pino({
  transport: {
    targets: [
      {
        target: 'pino-pretty',
        level: 'debug',
        options: {}
      }
    ]
  }
});
