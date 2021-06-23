const path = require("path")
const HtmlWebPackPlugin = require("html-webpack-plugin")

module.exports = {
  mode: "production",
  entry: {
    app: path.resolve(__dirname, "src", "App.tsx"),
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].js",
    chunkFilename: "[name].chunk.js",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      css: path.resolve(__dirname, "src", "css"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          // {
          //   loader: "babel-loader",
          //   options: {
          //     presets: ["@babel/preset-env", "@babel/preset-react"],
          //     plugins: ["@babel/plugin-transform-runtime"],
          //   },
          // },
          "ts-loader",
        ],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpg|svg)$/,
        use: ["file-loader"],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "src/index.html",
      filename: "index.html",
      // favicon: "./public/favicon.png",
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
}
