/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { NextFunction, Request, Response } from 'express';
import config from '../utils/config';
import logger from '../utils/logger';

const apiKeyHandlerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const headerName = config.API_HEADER?.toLocaleLowerCase();
    if (!headerName) {
      throw new Error(`Expected header: ${headerName}.`);
    }
    const key = req.headers[headerName];
    if (key !== config.API_KEY) {
      throw new Error(`Incorrect value for ${headerName} header.`);
    }
    next();
  } catch (err: any) {
    logger.error(err.message);
    res.status(403).send({ message: err.message });
  }
};

export default apiKeyHandlerMiddleware;
