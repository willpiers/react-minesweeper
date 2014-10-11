// var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  entry: "./src/js/index.js",
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
      	loader: 'style-loader!css-loader'
      },
      {
        test: /\.gif$/,
        loader: 'url-loader?limit=100000&mimetype=image/gif'
      }
    ]
  }
}