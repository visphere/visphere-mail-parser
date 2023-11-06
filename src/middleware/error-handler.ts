/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';

const errorHandlerMiddleware = (
  err: Error,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(err);
  }
  logger.error(err.message);
  res.status(500).send({ message: err.message });
};

export default errorHandlerMiddleware;
