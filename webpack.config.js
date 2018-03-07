module.exports = {
  entry: [
    './index2.js'
  ],
  output: {
    filename: './bundle.js'
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }]
  }
};
