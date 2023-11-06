'use strict';
/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
const { merge } = require('webpack-merge');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const webpackCommonConfig = require('./webpack-common.config.cjs');

module.exports = merge(webpackCommonConfig({ isProd: true, serverPort: 80 }), {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        terserOptions: {
          mangle: true,
          compress: true,
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
});
