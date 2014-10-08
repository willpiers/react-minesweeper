// var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  context: __dirname,
  entry: "./src/Board.react.js",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.react.js$/,
        loader: 'jsx-loader',
        devLoader: 'react-hot!jsx-loader'
      },
      {
        test: /\.js$/,
        loader: 'jsx-loader',
        devLoader: 'react-hot!jsx-loader'
      },
      {
      	test: /\.css$/,
      	loader: 'css-loader'
      },
      {
        test: /\.png$/,
        loader: 'file-loader'
      }
    ]
  }
}