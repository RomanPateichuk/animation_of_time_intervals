const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const dotenv = require('dotenv').config({
  path: path.resolve(__dirname, `./env/.env.dev`),
});

module.exports = merge(common, {
  mode: 'development',
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].bundle.[contenthash].js',
    clean: true,
    publicPath: '/',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.module\.s[ac]ss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                namedExport: false,
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  optimization: {
    sideEffects: false,
    moduleIds: 'named',
    usedExports: 'global',
    splitChunks: {
      name: 'false',
      chunks: 'all',
    },
  },
  performance: {
    hints: false,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.MODE': JSON.stringify('dev'),
      __ENV__: JSON.stringify(dotenv.parsed),
    }),
  ]
});
