'use strict';

const webpack = require('webpack');
const loaders = require('../webpack/loaders');
const plugins = require('../webpack/plugins');

module.exports = config => {
  config.set({
    basePath: '../',
    singleRun: !config.dev, // Keep browser open in dev mode
    browsers: ['Firefox'], // TODO optionnaly launch browsers
    frameworks: ['jasmine'],
    client: {
      jasmine: {
        clearContext: false,
        random: !config.dev // Randomly run test when not developping them
      }
    },
    files: [
      'test/testContext.js',
      'test/testStyle.css'    
    ],
    reporters: ['kjhtml', 'progress'],
    preprocessors: {
      'test/testContext.js': ['webpack']
    },
    babelPreprocessor: {
      options: {
        presets: ['env'],
        sourceMap: false
      }
    },
    webpack: {
      devtool: false,
      module: {
        rules: [
          loaders.JSLoader,
          loaders.CSSLoader
        ]
      },
      plugins: [
        new webpack.ProgressPlugin(),
        plugins.CleanWebpackPlugin,
        plugins.ESLintPlugin,
        plugins.StyleLintPlugin,
        plugins.MiniCssExtractPlugin
      ],
      watch: true,
      mode: 'development'
    },
    webpackServer: {
      noInfo: true
    }
  });
};
