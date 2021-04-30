
const webpack = require("webpack");
const path = require("path");
const OptimizeCSSAssets = require("optimize-css-assets-webpack-plugin");


let config = {
    mode: "development",   //none development or production mode
    devtool : "eval-source-map", // pas obligatoire // a supp en mode production 
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "./public"),
      filename: "./bundle.js"
    },
    module: {
        rules: 
      [
          {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
            // auto prefix
            "postcss-loader",
          ],
        }
      ]
    },
    plugins: [new OptimizeCSSAssets()]
  }
  
  module.exports = config;

  if (process.env.NODE_ENV === 'production') {
    module.exports.plugins.push(
      new OptimizeCSSAssets()
    );
  }