'use strict';
/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const { DefinePlugin } = require('webpack');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = ({ isProd, serverPort }) => ({
  entry: {
    index: path.resolve(__dirname, '..', 'src', 'server.ts'),
  },
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: '[name].js',
    clean: isProd,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts'],
    modules: ['node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /\/node_modules\//,
        use: [{ loader: 'ts-loader' }],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new NodemonPlugin(),
    new DefinePlugin({
      'process.env.SERVER_PORT': JSON.stringify(serverPort),
    }),
  ],
});
