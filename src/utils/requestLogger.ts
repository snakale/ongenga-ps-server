import * as morgan from 'morgan';
import { logger } from './logger';

// ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status ":referrer" ":user-agent" :response-time ms';

const format = ':requestId :remote-addr - :method :url HTTP/:http-version :status :response-time ms';
morgan.token('requestId', request => request.id);

const options = {
    stream: {
        write: message => logger.info(message.trim())
    }
};

export const requestLogger = morgan(format, options);