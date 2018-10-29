
import * as bodyParser from "body-parser";
import * as express from "express";
import * as http from 'http';
import * as session from 'express-session';
import * as masterRouter from "./routes/index";
import * as cors from "cors";
import "reflect-metadata";
import * as expressMysqlSession from 'express-mysql-session';
import { createTypeORMConnection } from './utils/createConnection';
import { getAppMySQLOptions } from "./utils/getAppMySQLOptions";
import { getSessionStoreOptions } from "./utils/getSessionStoreOptions";
import { logger } from "./utils/logger";
import { requestLogger } from "./utils/requestLogger";
import { unknownUrlHandler } from "./utils/unknownUrl.middleware";
import { serverErrorHandler } from "./utils/serverError.middleware";
import * as expressRequestId from 'express-request-id';

var MySQLStore = expressMysqlSession(session);
const sessionStore = new MySQLStore(getAppMySQLOptions());

createTypeORMConnection()
    .then( () => logger.info('DB connection opened'))
    .catch( e => logger.error(e));

const app = express();  

const sessionStoreOptions = getSessionStoreOptions();
app.use(session({ ...sessionStoreOptions, ...{store: sessionStore}}));

app.disable('x-powered-by');
app.use( expressRequestId()); //TODO: Append add header Request ID functionality on front-end
app.use( requestLogger); //Must come before router
app.use( bodyParser.json() );
app.use( '/api', masterRouter );
app.use( cors({credentials: true}) );
app.use( unknownUrlHandler ); //After the router, for all 404
app.use( serverErrorHandler ); //Error middleware 

const server = http.createServer(app);
const port = process.env.APP_PORT || 8000;

server
    .listen(port)
    .on('listening', async () => logger.info(`APP has been started on PORT ${port}`));
