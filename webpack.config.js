// var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  entry: "./index.js",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.react.js$/,
        loader: 'jsx-loader',
      },
      {
        test: /\.js$/,
        loader: 'jsx-loader',
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