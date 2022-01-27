const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/client/js/main.js",
  output: {
    path: path.resolve(__dirname, "assets", "js"),
    filename: "main.js",
  },
  watch: true,
  watchOptions: {
    aggregateTimeout: 3000,
    poll: 3000,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
    ],
  },
};
