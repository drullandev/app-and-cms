const path = require('path');
const dotenv = require('dotenv').config({ path: path.join(__dirname, '.env') });
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

const isDevelopment = import.meta.NODE_ENV !== 'production';

module.exports = {
  mode: isDevelopment ? 'development' : 'production',

  devtool: isDevelopment ? 'eval-source-map' : 'source-map',
  
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.parsed),
      'import.meta.NODE_ENV': JSON.stringify(isDevelopment ? 'development' : 'production'),
    }),
    isDevelopment && new BundleAnalyzerPlugin(),
  ].filter(Boolean),
  
  optimization: {
    minimize: !isDevelopment,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
          mangle: true,
          output: {
            comments: false,
          },
        },
        sourceMap: true, // Habilitar los source maps en Terser
      }),
    ],
  },
};
