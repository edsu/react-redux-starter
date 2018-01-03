const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const DIST_DIR = path.join(__dirname, 'dist')
const SRC_DIR = path.join(__dirname, 'src')

module.exports = {
  entry: ['./src/index'],

  devtool: 'inline-source-map',

  devServer: {
    contentBase: './dist',
    hot: true
  },

  output: {
    path:   DIST_DIR,
    publicPath: "/",
    filename: 'bundle.js'
  },

  plugins: [
    new webpack.EnvironmentPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],

  module: {

    rules: [
      {
        test:  /\.jsx?$/,
        exclude: /node_modules/,
        use:  ['babel-loader', 'eslint-loader']
			},
      {
        test:  /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]---[local]---[hash:base64:5]'
            }
          }
        ]
      },
      {
        test:  /\.(png|jpg|ttf|eot)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {limit: 10000}
          }
        ]
      }
    ]
  },

  resolve: {
    modules: ['node_modules', 'vendor'],
    extensions: ['.js', '.json', '.css']
  }

}
