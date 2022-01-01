const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (webpackEnv) {
    const isEnvProduction = webpackEnv === 'production';

    return {
        mode: isEnvProduction ? 'production' : 'development',
        entry: './src/index.tsx',
        devtool: isEnvProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            open: true,
            port: 3000,
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader', 'postcss-loader'],
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        output: {
            filename: 'main.js',
            path: path.resolve(__dirname, 'build'),
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './public/index.html',
            }),
        ],
    };
};
