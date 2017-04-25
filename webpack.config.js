const path = require('path');

module.exports = {

  // Definition of input => output
  entry: path.resolve(__dirname, 'client', 'index.jsx'),
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'app.js'
  },

  // React + babel transpilation to ES5
  module: {
    rules: [{
      test: /\.jsx?/,
      loader: 'babel-loader',
      query: { presets: ['es2015', 'react'] }
    }],
  }
};
