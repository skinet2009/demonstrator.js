const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const ExtractTextPluginConfig = new ExtractTextPlugin('[name].css');
const HtmlWebPackPluginConfig = new HtmlWebPackPlugin({
    template: path.join(__dirname, 'src', 'index.html'),
    filename: 'index.html',
    chunks: ['main']
});

module.exports = {
    mode: 'production',
    devtool: false,
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                'test': /\.js$/,
                'exclude': /node_modules/,
                'include': [path.resolve(__dirname, 'src')],
                'use': {'loader': 'babel-loader'}
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS, using Node Sass by default
                ]
                // use: ExtractTextPlugin.extract({
                //     fallback: 'style-loader',
                //     use: [
                //         // {
                //         //     loader: 'css-loader',
                //         //     options: {
                //         //         sourceMap: false,
                //         //         includePaths: [path.resolve(__dirname, 'node_modules')],
                //         //     },
                //         // },
                //         // {
                //             // loader: 'css-loader',
                //             // options: {
                //             //     minimize: true
                //             // }
                //         // },
                //         // 'resolve-url-loader',
                //         {
                //             loader: 'sass-loader',
                //             options: {sourceMap: true}
                //         }
                //     ]
                // })
            },
        ]
    },

    // загружаем плагины
    plugins: [
        HtmlWebPackPluginConfig,
        ExtractTextPluginConfig
    ]
};
