const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = function (env, args) {
    const isEnvProduction = process.env.NODE_ENV === 'production';

    return {
        mode: isEnvProduction ? 'production' : 'development',
        entry: './src/index.tsx',
        devtool: isEnvProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            open: true,
            port: 3000,
            hot: true,
            historyApiFallback: true,
        },
        module: {
            rules: [
                {
                    oneOf: [
                        {
                            test: /\.([jt]sx?)$/,
                            exclude: /node_modules/,
                            use: {
                                loader: 'babel-loader',
                            },
                        },
                        {
                            test: /\.css$/i,
                            use: [
                                'style-loader',
                                'css-loader',
                                'postcss-loader',
                            ],
                        },
                        {
                            type: 'asset',
                            resourceQuery: /url/, // *.svg?url
                        },
                        {
                            test: /\.svg$/i,
                            issuer: /\.[jt]sx?$/,
                            use: [
                                {
                                    loader: '@svgr/webpack',
                                    options: {
                                        prettier: false,
                                        svgo: false,
                                        svgoConfig: {
                                            plugins: [{ removeViewBox: false }],
                                        },
                                        titleProp: true,
                                        ref: true,
                                    },
                                },
                            ],
                        },
                        {
                            test: /\.(png|svg|jpg|jpeg|gif)$/i,
                            type: 'asset/resource',
                        },
                    ],
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js', 'jsx', '.json'],
            plugins: [new TsconfigPathsPlugin()],
        },
        output: {
            filename: 'main.js',
            path: path.resolve(__dirname, 'build'),
            publicPath: '/',
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html',
            }),
            !isEnvProduction && new ReactRefreshWebpackPlugin(),
        ].filter(Boolean),
    };
};
