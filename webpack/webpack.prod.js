'use strict';

const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  target: ['web', 'es5'] // Transpile module to es5 JavaScript
});
