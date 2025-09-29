const webpack = require("webpack");
const path = require("path");

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
            }, {
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
    ],
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