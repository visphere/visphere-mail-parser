/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { Request, Response, Router } from 'express';
import mailParserController from '../controller/mail-parser.controller';

const router: Router = Router();

router.post('/api/v1/email/parse', mailParserController.parseMail);
router.get('*', (_: Request, res: Response) => res.redirect('/'));

export default router;
