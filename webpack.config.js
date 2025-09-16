// const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const webpack = require("webpack");
const path = require("path");
// const ESLintPlugin = require('eslint-webpack-plugin');

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
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                        }
                    }
                ]
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
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|webp)$/i,
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
        // new ESLintPlugin({
        //     context: path.resolve(__dirname, 'src'), // где искать файлы
        //     extensions: ['js', 'jsx', 'ts', 'tsx', 'vue'], // какие расширения проверять
        //     emitWarning: true,    // выводить нарушения как ворнинги, а не ошибки сборки
        //     emitError: true,      // выводить ошибки ESLint как ошибки сборки
        //     failOnError: false,   // завершать сборку при ошибках (можно true для CI)
        //     fix: false,           // авто‑фикс там, где возможно (npm run build)
        //     cache: true,          // кешировать результаты, ускоряет повторные сборки
        //     lintDirtyModulesOnly: true, // проверять только изменённые файлы в watch‑режиме
        // }),
        // new ForkTsCheckerWebpackPlugin({
        //     async: false,
        //     eslint: {
        //         files: "./src/**/*",
        //     },
        // }),
    ],
    devServer: {
        server: {
            type: 'http',
        },
        static: {
            directory: __dirname + '/build',
        },
        allowedHosts: 'all',
        compress: true,
        port: 9001,
        client: {
            progress: false,
        },
        host: 'localhost',
    }
}