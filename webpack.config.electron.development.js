/**
 * Build config for electron 'Main Process' file
 */

const path = require('path');
const {
  dependencies: externals
} = require('./app/package.json');
const webpack = require('webpack');

// const merge = require('webpack-merge');
// const baseConfig = require('./webpack.config.base');

// module.exports = merge(baseConfig, {
//   // devtool: 'source-map',

//   entry: ['./app/electron-main'],

//   // 'main.js' in root
//   output: {
//     path: __dirname,
//     filename: './app/main.development.js'
//   },

//   plugins: [
//     // Add source map support for stack traces in node
//     // https://github.com/evanw/node-source-map-support
//     // new webpack.BannerPlugin(
//     //   'require("source-map-support").install();',
//     //   { raw: true, entryOnly: false }
//     // ),
//     new webpack.DefinePlugin({
//       'process.env': {
//         NODE_ENV: JSON.stringify('development')
//       }
//     })
//   ],

//   /**
//    * Set target to Electron specific node.js env.
//    * https://github.com/chentsulin/webpack-target-electron-renderer#how-this-module-works
//    */
//   target: 'electron-main',

//   /**
//    * Disables webpack processing of __dirname and __filename.
//    * If you run the bundle in node.js it falls back to these values of node.js.
//    * https://github.com/webpack/webpack/issues/2010
//    */
//   node: {
//     __dirname: false,
//     __filename: false
//   },
// });

module.exports = {
  entry: ['./app/electron-main'],

  // 'main.development.js' in root
  output: {
    path: __dirname,
    filename: './app/main.development.js'
  },

  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.tsx?/,
        loader: 'tslint-loader',
        exclude: /(node_modules)/,
      },
      {
        test: /\.tsx?/,
        loader: ['ts-loader'],
        exclude: /(node_modules)/,
      }
    ]
  },
  // https://webpack.github.io/docs/configuration.html#resolve
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json'],
    modules: [
      path.join(__dirname, 'app'),
      'node_modules',
    ]
  },

  plugins: [

    // NODE_ENV should be production so that modules do not perform certain development checks
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),

    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
  ],

  /**
   * Set target to Electron specific node.js env.
   * https://github.com/chentsulin/webpack-target-electron-renderer#how-this-module-works
  //  */
  target: 'electron-main',

  /**
   * Disables webpack processing of __dirname and __filename.
   * If you run the bundle in node.js it falls back to these values of node.js.
   * https://github.com/webpack/webpack/issues/2010
   */
  node: {
    __dirname: false,
    __filename: false
  },
};
