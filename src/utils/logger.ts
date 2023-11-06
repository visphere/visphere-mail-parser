/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import path from 'path';
import winston, { Logform, Logger, transport } from 'winston';

class WinstonLogger {
  private readonly LEVELS = { error: 0, warn: 1, info: 2, http: 3, debug: 4 };
  private readonly COLORS = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
  };
  private readonly LOGS_PATH = 'logs';

  private getFormat(): Logform.Format {
    return winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
      winston.format.colorize({ all: true }),
      winston.format.printf(
        info => `${info.timestamp} ${info.level}: ${info.message}`
      )
    );
  }

  private getTransports(): Array<transport> {
    return [
      new winston.transports.Console(),
      new winston.transports.File({
        filename: path.resolve(__dirname, this.LOGS_PATH, 'error.log'),
        level: 'error',
      }),
      new winston.transports.File({
        filename: path.resolve(__dirname, this.LOGS_PATH, 'all.log'),
      }),
    ];
  }

  getLogger(): Logger {
    winston.addColors(this.COLORS);
    return winston.createLogger({
      level: 'info',
      levels: this.LEVELS,
      format: this.getFormat(),
      transports: this.getTransports(),
    });
  }
}

export default new WinstonLogger().getLogger();
