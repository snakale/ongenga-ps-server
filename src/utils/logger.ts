import { createLogger, format, transports } from 'winston';

const appFormat = format.printf(info => {
    // `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
    return `${info.timestamp} ${info.level}: ${info.message}`;
});

const appLoggerFormat = format.combine(
    format.colorize(),
    format.timestamp(),
    appFormat
    //format.json()
);

export const logger = createLogger({
    format: appLoggerFormat,
    transports: [
        new transports.Console()
    ]
});
