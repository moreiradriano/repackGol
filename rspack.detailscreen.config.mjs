import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as Repack from '@callstack/repack';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default Repack.defineRspackConfig({
  context: __dirname,
  entry: './detailscreen-entry.js',
  mode: 'production',
  devtool: false,
  resolve: {
    ...Repack.getResolveOptions(),
  },
  module: {
    rules: [
      {
        test: /\.[cm]?[jt]sx?$/,
        type: 'javascript/auto',
        use: {
          loader: '@callstack/repack/babel-swc-loader',
          parallel: true,
          options: {},
        },
      },
      ...Repack.getAssetTransformRules(),
    ],
  },
  plugins: [new Repack.RepackPlugin()],
  output: {
    path: path.resolve(__dirname, 'dist/detailscreen'),
    filename: 'detailscreen.[contenthash].js',
    publicPath: 'https://seu-cdn.com/detailscreen/',
    library: {
      name: 'DetailScreen',
      type: 'umd',
    },
  },
});
