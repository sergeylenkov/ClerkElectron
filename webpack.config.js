const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/app/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build/app'),
  },
  resolve: {
    extensions: ['.ts', '.js', '.json', 'scss'],
    alias: {
      ui: path.resolve(__dirname, 'src/app/ui/'),
      data: path.resolve(__dirname, 'src/app/data/'),
      utils: path.resolve(__dirname, 'src/app/utils/'),
      locales: path.resolve(__dirname, 'src/app/locales/'),
    }
  },
  target: 'electron-renderer',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: ['ts-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader:'css-loader',
            options: {
              url: false
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new HtmlWebpackPlugin({
      title: 'Clerk'
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/app/assets', to: 'static' }
      ]
    })
  ]
};
