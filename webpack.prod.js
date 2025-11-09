const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const dotenv = require('dotenv').config({
  path: path.resolve(__dirname, `./env/.env.prod`),
});

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].bundle.[contenthash].js',
    clean: true,
    publicPath: '/',
  },
  devtool: 'nosources-source-map',
  optimization: {
    moduleIds: 'deterministic',
    usedExports: true,
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin({
        exclude: /(node_modules)/,
        minify: CssMinimizerPlugin.cleanCssMinify,
      }),
    ],
    splitChunks: {
       name: 'false',
       chunks: 'all',
    },
    runtimeChunk: 'single',
  },
  module: {
    rules: [
      {
        test: /\.module\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
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
  performance: {
    hints: false,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        MODE: JSON.stringify('prod'),
      },
      __ENV__: JSON.stringify({ ...dotenv.parsed }),
    }),
  ],
});
