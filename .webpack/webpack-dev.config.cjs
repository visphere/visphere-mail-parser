'use strict';
/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
const { merge } = require('webpack-merge');
const { SourceMapDevToolPlugin } = require('webpack');
const webpackCommonConfig = require('./webpack-common.config.cjs');

module.exports = merge(
  webpackCommonConfig({
    isProd: false,
    serverPort: process.env.ENV_VSPH_MAIL_PARSER_API_DEV_PORT,
  }),
  {
    mode: 'development',
    plugins: [
      new SourceMapDevToolPlugin({
        filename: '[file].map',
      }),
    ],
  }
);
