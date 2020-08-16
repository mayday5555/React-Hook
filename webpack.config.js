const path = require('path');
const webpack = require('webpack');
module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 3000,
    publicPath: 'http://localhost:3000/dist',
    hotOnly: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader', 'babel-loader']
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.jsx', '.tsx'],
  }, // The resolve property allows us to specify which extensions Webpack will resolve — this allows us to import modules without needing to add their extensions.
  // 引入时无需加入后缀
  plugins: [new webpack.HotModuleReplacementPlugin()],
};
