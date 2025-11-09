const path = require('path');
const { merge } = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const dotenv = require('dotenv').config({
  path: path.resolve(__dirname, `./env/.env.local`),
});

module.exports = merge(common, {
  devtool: 'source-map',

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },

  plugins: [
    new ReactRefreshWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        MODE: JSON.stringify('local'),
      },
    }),
    new webpack.DefinePlugin({
      __ENV__: JSON.stringify({ ...dotenv.parsed }),
    }),
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    historyApiFallback: true,
    hot: true,
    compress: true,
    port: 3000,
  },
});
