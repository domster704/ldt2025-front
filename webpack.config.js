const webpack = require("webpack");
const path = require("path");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
            '@app': path.resolve(__dirname, './src/app'),
            '@shared': path.resolve(__dirname, './src/shared'),
            '@entities': path.resolve(__dirname, './src/entities'),
            '@features': path.resolve(__dirname, './src/features'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@widgets': path.resolve(__dirname, './src/widgets'),
        }
    },
    entry: './src/app/index.tsx',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, "build"),
        filename: 'main.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                }
            },
            {
                test: /\.module\.css$/i,
                use: ["style-loader", { loader: "css-loader", options: { modules: true } }]
            },
            {
                test: /\.css$/i,
                exclude: /\.module\.css$/i,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                use: [
                    {
                        loader: '@svgr/webpack',
                        options: {
                            icon: true,
                        },
                    },
                ],
            }, {
                test: /\.(png|jpg|jpeg|gif|svg|webp|mp3)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": JSON.stringify(process.env)
        }),
        new ForkTsCheckerWebpackPlugin({ async: false })
    ],
    watchOptions: {
        ignored: /node_modules/,
    },
    devServer: {
        static: {
            directory: __dirname + '/build',
        },
        compress: true,
        port: 9007,
        client: {
            progress: false,
        },
        host: 'localhost',
    }
}