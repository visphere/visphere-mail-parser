/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { NextFunction, Request, Response } from 'express';
import { minify } from 'html-minifier';
import mjml2html from 'mjml';
import logger from '../utils/logger';

class MailParserController {
  async parseMail(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    logger.info('Started processing email template.');
    let parsedContent;
    try {
      if (
        Object.keys(req.body).length === 0 ||
        !Object.keys(req.body).includes('rawData')
      ) {
        throw new Error("Expected 'rawData' key in JSON body.");
      }
      const rawContent = req.body['rawData'] as string;
      const { html } = mjml2html(rawContent);
      parsedContent = minify(html, { collapseWhitespace: true });
    } catch (err: any) {
      next(err);
      return;
    }
    logger.info(
      `End up processing email template. Template: ${parsedContent.replace(
        /\n|\s|\r/g,
        ''
      )}`
    );
    res.send(parsedContent);
  }
}

export default new MailParserController();
