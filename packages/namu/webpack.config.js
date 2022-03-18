/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  mode: "development",
  devServer: {
    port: 5510,
    hot: true,
    open: true,
    historyApiFallback: true,
    watchFiles: ["src/**/*.ts", "public/**/*"],
  },
  // devtool: 'inline-source-map',
  target: ["es5", "web"],
  entry: {
    // 각 html에 필요한 entry 파일
    index: "./src/main.js",
    login: "./src/login.js",
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[chunkhash].js",
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    plugins: [new TsconfigPathsPlugin({})],
  },
  plugins: [
    new HTMLWebpackPlugin({
      hash: true,
      filename: "index.html",
      excludeChunks: ["login"], // entry에서 해당 리스트를 제외한 나머지
      template: path.resolve(__dirname, "index.html"),
      favicon: "./favicon.ico",
    }),
    new HTMLWebpackPlugin({
      hash: true,
      filename: "login.html",
      chunks: ["login"], // entry에서 해당 리스트만 포함
      template: path.resolve(__dirname, "login.html"),
      favicon: "./favicon.ico",
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      // {
      //   test: /\.s[ac]ss$/i,
      //   use: [
      //     'style-loader',
      //     'css-loader',
      //     'resolve-url-loader',
      //     {
      //       loader: 'sass-loader',
      //       options: {
      //         sourceMap: true,
      //       },
      //     },
      //   ],
      //   exclude: /node_modules/,
      // },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(ts|tsx)$/,
        include: path.join(__dirname, "src"),
        exclude: /(node_modules)|(dist)/,
        use: {
          loader: "ts-loader",
          options: {
            configFile: path.resolve(__dirname, "tsconfig.json"),
            // skip typechecking for speed
            transpileOnly: true,
          },
        },
      },
    ],
  },
};
