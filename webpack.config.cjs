
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const API_PORT = process.env.PORT || 8080

module.exports = {
  entry: ['babel-polyfill', './src/client/index.tsx'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main[hash].js'
  },
  module: {
    rules: [{
        test: /\.(ts|tsx|js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  resolve: {
    extensions: ['.ts','.tsx', '.js']
  },
  devServer: {
    port: 3000,
    open: true,
    historyApiFallback: true,
    proxy: {
      '/api': `http://localhost:${API_PORT}`
    }
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
};