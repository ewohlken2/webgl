const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");



const merge = require('webpack-merge');
const common = require('./webpack.common.js');


const websiteDir = path.resolve(__dirname, '../SmartStop.Website');
const buildDir = 'bundle';
const assetDir = 'assets';

module.exports = merge(common, {
    devtool: 'source-map',
    entry: {
        main: './src/index.js',
        rentReserveForm:'./src/rent-reserve-form.js',
        storageSearch:'./src/storage-search.js',
        account:'./src/my-account.js',
        location:'./src/location-page.js'
    },
    output: {
        filename: '[name].[contenthash].min.js',
        path: path.resolve(websiteDir, buildDir)
    },

    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                // sourceMap: true,
                cache: true
            }),
            new OptimizeCSSAssetsPlugin()
        ],
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /(react|redux)/,
                    chunks: 'initial',
                    name: 'vendor',
                    enforce: true,
                    priority:20
                  },
                  commons: {
                    enforce:true,
                    priority:10,
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: 2,
                    reuseExistingChunk:true
                  }
            }
        },
        // runtimeChunk:true
    },
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            }
        ]
    },
    plugins: [
        new LodashModuleReplacementPlugin,
        new CleanWebpackPlugin([assetDir, buildDir], {
            root: websiteDir
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].[contenthash].min.css',
          }),
        // new BundleAnalyzerPlugin(),
        new webpack.ContextReplacementPlugin(
            /moment[/\\]locale$/,
            /en|fr/
        ),
        new CopyWebpackPlugin([{
            from: 'src/assets', to: path.resolve(websiteDir, assetDir)
        }])
    ]
});
