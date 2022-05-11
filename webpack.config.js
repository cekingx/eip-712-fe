const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/js/app.js',
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/dist`,
    publicPath: `${__dirname}/dist`
  },
  devServer: {
    static: {
      directory: `${__dirname}/dist`,
    },
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new CopyPlugin({
      patterns: [
        {
          from: 'src/*',
          to: '[name][ext]',
          globOptions: {
            ignore: ['**/*.js']
          }
        }
      ]
    }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
  resolve: {
    fallback: {
      "stream": require.resolve("stream-browserify")
    }
  }
}