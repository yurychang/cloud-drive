const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isEnvProduction = process.env.NODE_ENV === 'production';

module.exports = {
    mode: isEnvProduction ? 'production' : 'development',
    entry: './src/index.tsx',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'build'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],
};
