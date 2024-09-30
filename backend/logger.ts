// logger.ts
import { createLogger, format, transports } from 'winston';
import path from 'path';

const logger = createLogger({
   level: 'info',
   format: format.combine(format.timestamp(), format.errors({ stack: true }), format.splat(), format.json()),
   defaultMeta: { service: 'user-service' },
   transports: [
      new transports.Console(), // Muestra los logs en la consola

      // Write all logs with level `error` to `error.log`
      new transports.File({ filename: path.join(__dirname, 'logs/error.log'), level: 'error' }),
      // Write all logs with level `info` and below to `combined.log`
      new transports.File({ filename: path.join(__dirname, 'logs/combined.log') }),
   ],
});



// If we're not in production, log to the console with the format:
if (process.env.NODE_ENV !== 'production') {
   logger.add(
      new transports.Console({
         format: format.combine(format.colorize(), format.simple()),
      }),
   );
}

export default logger;
