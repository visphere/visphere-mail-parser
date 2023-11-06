/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import express, { Express } from 'express';
import nocache from 'nocache';
import apiKeyHandlerMiddleware from './middleware/api-key-handler';
import errorHandlerMiddleware from './middleware/error-handler';
import router from './router/api-routes';
import config from './utils/config';
import logger from './utils/logger';

const app: Express = express();
const port = config.PORT;

app.use(nocache());
app.use(express.json());

app.use(apiKeyHandlerMiddleware);
app.use(router);
app.use(errorHandlerMiddleware);

app.listen(port, () =>
  logger.info(`Server is up and running at @ http:127.0.0.1:${port}`)
);
