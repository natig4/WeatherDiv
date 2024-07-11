const path = require("path");
const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "weather-div.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    library: {
      type: "umd",
      name: "WeatherWidget",
    },
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
  plugins: [],
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
