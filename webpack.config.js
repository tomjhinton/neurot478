var path = require('path')
const webpack = require('webpack')
const isProd = (process.env.NODE_ENV === 'production')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devtool: isProd ? false : 'source-map',
  devServer: {
    contentBase: path.resolve('src'),
    hot: true,
    open: true,
    port: 8000,
    watchContentBase: true,
    proxy: {
      '/api': 'http://localhost:4000'
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      inject: 'body',
      favicon: 'src/assets/favicon.png'

    }),
    new webpack.ProvidePlugin({ 'window.decomp': 'poly-decomp' }),
    new CopyWebpackPlugin( {
      patterns: [
        { from: 'src/assets', to: 'assets' }
      ]}
    )
  ]
}
