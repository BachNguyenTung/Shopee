var path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // ...
  stats: {
    children: true,
  },
  mode: "development",
  entry: "./src/index.js",
  plugins: [
    new HtmlWebpackPlugin({
      title: "Output HTML",
      template: "./src/index.html",
      inject: "body"
    })
  ],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};
