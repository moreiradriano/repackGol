import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as Repack from '@callstack/repack';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Configuração Rspack para gerar bundle do MiniApp para CDN
 * Este bundle contém apenas o MiniAppWorking e suas dependências
 */

export default Repack.defineRspackConfig({
  context: __dirname,
  // Ponto de entrada específico para o MiniApp
  entry: './miniapp-entry.js',
  mode: 'production',
  devtool: false, // Sem source maps para produção
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
  plugins: [
    new Repack.RepackPlugin({
      // Configurações específicas para o MiniApp
      context: __dirname,
      mode: 'production',
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist/miniapp'),
    filename: 'miniapp.[contenthash].js',
    chunkFilename: 'miniapp.[name].[contenthash].chunk.js',
    // URL base para quando for hospedado no CDN
    publicPath: 'https://seu-cdn.com/miniapp/',
    clean: true,
    library: {
      name: 'MiniApp',
      type: 'umd',
      export: 'default',
    },
    globalObject: 'this',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    minimize: true,
  },
});
