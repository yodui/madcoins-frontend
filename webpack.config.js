const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const SRC_DIR = 'src';
const DIST_DIR = 'dist';

const production = process.env.NODE_ENV === 'production';

module.exports = {
    entry: {
        app: path.resolve(__dirname, SRC_DIR, "index.js")
    },
    output: {
        path: path.resolve(__dirname, DIST_DIR),
        filename: production ? '[name].[contenthash].js' : '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(.png|jp(e*)g|svg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'assets/[hash]-[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ["*", ".js", ".css"]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, SRC_DIR, 'index.html'),
            filename: 'index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        historyApiFallback: true,
        port: 3001,
        hot: true
    },
    mode: production ? 'production' : 'development'
}
