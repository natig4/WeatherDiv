const path = require("path");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  entry: ["./src/index"],
  output: {
    filename: "weather-div.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [new Dotenv(), new HtmlWebpackPlugin({ template: "./index.html" })],
  resolve: {
    extensions: [".ts", ".js"],
  },
  devtool: isProduction ? "none" : "inline-source-map",
  mode: isProduction ? "production" : "development",
  devServer: {
    watchFiles: ["src/**/*"],
    static: "./dist",
  },
};
