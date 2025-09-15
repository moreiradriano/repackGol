const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: './detailscreen-entry.js',
  output: {
    path: path.resolve(__dirname, 'dist/detailscreen'),
    filename: 'detailscreen.[contenthash].js',
    publicPath: 'https://seu-cdn.com/detailscreen/',
    library: {
      name: 'DetailScreen',
      type: 'umd',
    },
    globalObject: 'globalThis',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      'react-native': 'react-native-web',
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
  externals: {
    react: 'React',
    'react-native': 'ReactNative',
  },
};
