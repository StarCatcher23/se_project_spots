const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    main: "./src/pages/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"), // use __dirname
    filename: "main.js",
    publicPath: "",
  },

  mode: "development",
  devtool: "inline-source-map",
  stats: "errors-only",

  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"), // updated for Webpack 5 syntax
    },
    compress: true,
    port: 8080,
    open: true,
    liveReload: true,
    hot: false,
  },

  target: ["web", "es5"],

  module: {
    rules: [
      {
        test: /\.js$/, // escape dot
        loader: "babel-loader",
        exclude: /node_modules/, // remove quotes
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|webp|gif|woff2?|eot|ttf|otf)$/,
        type: "asset/resource",
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],
};
