const path = require('path');
const webpack = require('webpack');
const argv = require('minimist')(process.argv.slice(2));

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WriteFilePlugin = require('write-file-webpack-plugin');

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const dynamicConfig = {};
const port = argv['port'] || 8080;

if(argv['remote']) {
    dynamicConfig.output = {
        path: path.resolve(__dirname, "dist"),
        publicPath: 'http://' + argv['remote'] + ':' + port
    };
}

// const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

module.exports = merge(common, dynamicConfig, {
    devtool: 'eval-cheap-module-source-map',
    entry: [
        './src/index.js',
    ],
    devServer: {
        port: port,
        host: argv['remote'] || '0.0.0.0',
        hot: true,
        disableHostCheck: true,
        historyApiFallback:true,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        watchOptions: {
            ignored: /node_modules/
        },
        contentBase: [path.join(__dirname, "dist")],
        stats: {
            colors: true,
            hash: false,
            version: false,
            timings: false,
            assets: false,
            chunks: false,
            modules: false,
            // reasons: false,
            children: false,
            // source: false,
            // errors: false,
            // errorDetails: false,
            // warnings: false,
            // publicPath: false
          }
    },
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                use: [
                    'style-loader',
                    {
                        // translates CSS into CommonJS
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        // compiles Sass to CSS
                        loader: "sass-loader",
                        options: {
                            outputStyle: 'expanded',
                            sourceMap: true,
                            sourceMapContents: true
                        }
                    }
                ]
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/static/index.pug',
            filename: "./index.html",
            inject: true,
            alwaysWriteToDisk: true
        }),
        // new HtmlWebpackHarddiskPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new WriteFilePlugin(),
        new CopyWebpackPlugin([
            { from: './src/assets', to: 'assets' },
        ])
    ]
});
