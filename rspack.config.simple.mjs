import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as Repack from '@callstack/repack';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Configuração simplificada do Rspack para demonstrar Module Federation
 */

export default Repack.defineRspackConfig({
  context: __dirname,
  entry: './index.js',
  mode: 'development',
  devtool: 'source-map',
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
    new Repack.RepackPlugin(),
    // Configuração simplificada do Module Federation
    new Repack.plugins.ModuleFederationPlugin({
      name: 'HostApp',
      filename: 'remoteEntry.js',
      exposes: {
        './MiniAppNavigator': './src/screens/MiniAppNavigator',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^19.1.0',
        },
        'react-native': {
          singleton: true,
          requiredVersion: '^0.81.4',
        },
      },
    }),
  ],
});
