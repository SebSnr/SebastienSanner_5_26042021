
const webpack = require("webpack");
const path = require("path");
const OptimizeCSSAssets = require("optimize-css-assets-webpack-plugin");


let config = {
    mode: "development",   //none development or production mode
    devtool : "eval-source-map", // pas obligatoire // a supp en mode production 
    entry: {
      polyfill: "babel-polyfill",
      app: "./src/app.js"
    },  
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "./public")
    },
    module: {
        rules: 
      [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env"]
              }
            },
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