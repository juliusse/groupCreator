const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [{
      test: /\.less$/,
      use: [{
        loader: 'style-loader', // creates style nodes from JS strings
      }, {
        loader: 'css-loader', // translates CSS into CommonJS
      }, {
        loader: 'less-loader', // compiles Less to CSS
      }],
    }, {
      test: /\.css$/,
      use: [{
        loader: 'style-loader', // creates style nodes from JS strings
      }, {
        loader: 'css-loader', // translates CSS into CommonJS
      }],
    }, {
      test: /\.svg$/,
      use: [{
        loader: 'style-loader', // creates style nodes from JS strings
      }, {
        loader: 'svg-loader', // translates CSS into CommonJS
      }],
    }, {
      test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 8192,
        },
      },
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          retainLines: true,
        },
      },
    }],
    loaders: [],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
      // In case you imported plugins individually, you must also require them here:
      Util: 'exports-loader?Util!bootstrap/js/dist/util',
      Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
    }),
  ],
};
