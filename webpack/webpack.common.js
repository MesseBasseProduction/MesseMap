'use strict';

const path = require('path');
const webpack = require('webpack');
const loaders = require('./loaders');
const plugins = require('./plugins');

module.exports = {
  entry: ['./src/js/PosterMapMaker.js'],
  module: {
    rules: [
      loaders.JSLoader,
      loaders.CSSLoader
    ]
  },
  output: {
    filename: 'PosterMapMaker.bundle.js',
    path: path.resolve(__dirname, '../dist'),
    library: 'PosterMapMaker', // We set a library name to bundle the export default of the class
    libraryTarget: 'window', // Make it globally available
    libraryExport: 'default' // Make PosterMapMaker.default become HomeMap
  },
  plugins: [
    new webpack.ProgressPlugin(),
    plugins.CleanWebpackPlugin,
    plugins.ESLintPlugin,
    plugins.StyleLintPlugin,
    plugins.MiniCssExtractPlugin
  ]
};
