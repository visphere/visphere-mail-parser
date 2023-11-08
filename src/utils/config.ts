/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import * as dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.SERVER_PORT,
  API_HEADER: process.env.API_HEADER,
  API_KEY: process.env.API_KEY,
};
