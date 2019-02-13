import { createLogger, format, transports } from 'winston';
import * as path from 'path';
import * as uuid from 'uuid';
import * as fs from 'fs';

const { combine, timestamp, label, printf, prettyPrint, splat, json } = format;

const logDirectory = path.resolve(__dirname, './logs');

if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}

['errors', 'combined'].forEach(d => {
    const t = path.join(logDirectory, d);
    if (!fs.existsSync(t)) {
        fs.mkdirSync(t);
    }
});

const id = uuid.v4();
const errorFilename = path.join(logDirectory, 'errors', `error-${id}.log`);
const combinedFilename = path.join(logDirectory, 'combined', `combined-${id}.log`);

const logger :any = createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    prettyPrint()
  ),

  transports: [
    new transports.File({
      filename: errorFilename,
      level: 'error'
    }),
    new transports.File({
      filename: combinedFilename
    })
  ]
});

const originalLog = logger.__proto__.log;

logger.__proto__.log = function (level, msg, meta) {
    const correlationId = uuid.v4();

    return Object.assign(
        { correlationId },
        originalLog.apply(logger, [level, msg, meta, { correlationId }]));
};

logger.log('info', 'App Started.');

export { logger };
