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
  module: {
    rules: [
      { test: /\.jsx?$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.s(a|c)ss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      {test: /\.svg$/,
        use: 'svg-inline-loader'},
      {
        test: /\.txt$/i,
        use: 'raw-loader'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }}]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  },
  target: 'web',
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
    new webpack.ProvidePlugin({
      THREE: 'three'
    }),
    new webpack.ProvidePlugin({ 'window.decomp': 'poly-decomp' }),
    new CopyWebpackPlugin( {
      patterns: [
        { from: 'src/assets', to: 'assets' }
      ]}
    ),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer']
    })
  ]
}
