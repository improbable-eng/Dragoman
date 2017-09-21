/**
 * Build config for electron 'Renderer Process' file
 */

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.config.base');

module.exports = merge(baseConfig, {
  devtool: 'cheap-module-source-map',

  entry: [
    './app/index'
  ],

  output: {
    path: path.join(__dirname, 'app/dist'),
    publicPath: '../dist/'
  },

  module: {
    rules: [
      {
        test: /\.global\.css$/,
        loaders: [
          'style-loader',
          // 'css-loader?sourceMap'
        ]
      },

      {
        test: /^((?!\.global).)*\.css$/,
        loaders: [
          'style-loader',
          // 'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
        ]
      },

      // Add SASS support  - compile all .global.scss files and pipe it to style.css
      {
        test: /\.global\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              // sourceMap: true,
            },
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      // Add SASS support  - compile all other .scss files and pipe it to style.css
      {
        test: /^((?!\.global).)*\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              // sourceMap: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]__[hash:base64:5]',
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
    ]
  },

  plugins: [
    // https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
    // https://github.com/webpack/webpack/issues/864
    new webpack.optimize.OccurrenceOrderPlugin(),

    // NODE_ENV should be production so that modules do not perform certain development checks
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),

    new HtmlWebpackPlugin({
      filename: '../app.html',
      template: 'app/app.html',
      inject: false
    })
  ],

  // https://github.com/chentsulin/webpack-target-electron-renderer#how-this-module-works
  target: 'electron-renderer'
});
