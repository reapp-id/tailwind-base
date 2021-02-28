var path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReplacePlugin = require("webpack-plugin-replace");
// var HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');


module.exports = [
  {
    entry: ["./src/app.scss"],
    output: {
        filename: "app.js",
        path: path.resolve(__dirname, "public"),
        publicPath: path.resolve(__dirname, "public")
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "OLSHOP",
        filename: "index.html",
        // Load a custom template (lodash by default)
        template: "./src/index.hbs",
        minify: false
      }),
      new ReplacePlugin({
        exclude: [/node_modules/, (filepath) => filepath.includes("ignore")],
        // patterns: [{
        //   regex: /throw\s+(new\s+)?(Type|Reference)?Error\s*\(/g,
        //   value: 'return;('
        // }],
        values: {
          "process.env.NODE_ENV": JSON.stringify("production"),
          AUTHOR: "Ardi Renaldi",
          APP_TITLE: "OLSHOP"
        },
      }),
    ],
    module: {
      rules: [
        {
            test: /\.hbs$/,
            loader: "handlebars-loader",
            options: {
              runtime: path.resolve(__dirname, 'modules/handlebars.js'),
            },
          },
        {
          test: /\.scss$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "index.css",
              },
            },
            { loader: "extract-loader" },
            { loader: "css-loader" },
            { loader: "postcss-loader" },
            {
              loader: "sass-loader",
              options: {
                sassOptions: {
                  includePaths: ["./node_modules"]
                },
                // Prefer Dart Sass
                implementation: require("sass"),

                // See https://github.com/webpack-contrib/sass-loader/issues/804
                webpackImporter: false,
              },
            },
          ],
        }
      ],
    },
    devServer: {
      contentBase: path.join(__dirname, "public"),
      compress: true,
      port: 9000,
      liveReload: true
    },
  },
];
