import TerserPlugin from 'terser-webpack-plugin';
import path from 'path';
import { fileURLToPath } from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = (process.env.NODE_ENV === 'production');

export default {
  mode: isProduction ? 'production' : 'development',
  cache: true,
  entry: {
    app: './src/index.js',
  },
  output: {
    filename: isProduction ? '[name].min.js' : '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            babelrc: false,
          },
        },
      },
    ],
  },
  resolve: {
    modules: [
      path.resolve(dirname),
      'node_modules',
    ],
    alias: {
      '@': path.resolve(dirname, 'src'),
    },
  },

  performance: {
    maxEntrypointSize: 1000000,
    maxAssetSize: 1000000,
  },
  optimization: {
    minimize: isProduction,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
  externals: {
    jquery: 'jQuery',
  },
};
