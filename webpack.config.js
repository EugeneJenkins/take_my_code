const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const { DefinePlugin } = require('webpack');
require('dotenv').config();

const commonConfig = {
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
};

// Конфигурация для фронтенда
const frontendConfig = {
    ...commonConfig,
    entry: './frontend/src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist/frontend'),
        filename: 'bundle.[contenthash].js',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './frontend/public/index.html',
        }),
        new DefinePlugin({
            NODE_ENV: JSON.stringify(process.env.APP_ENV || 'development'),
        }),
    ],
    devServer: {
        static: path.resolve(__dirname, 'dist/frontend'),
        compress: true,
        port: 3000,
        hot: true,
        proxy: [
            {
                context: ['/api'],
                target: `http://localhost:${process.env.APP_PORT}`,
                secure: false,
                changeOrigin: true,
            }
        ],
    },
};

// Конфигурация для бэкенда
const backendConfig = {
    ...commonConfig,
    entry: './backend/index.ts',
    target: 'node',
    externals: [nodeExternals()],
    output: {
        path: path.resolve(__dirname, 'dist/backend'),
        filename: 'index.js',
    },
    node: {
        __dirname: false,
        __filename: false,
    },
    plugins: [
        new CleanWebpackPlugin(),
        new DefinePlugin({
            NODE_ENV: JSON.stringify(process.env.APP_ENV || 'development'),
        }),
    ],
};

// Экспорт конфигурации в зависимости от окружения
module.exports = (env) => {
    if (env === 'frontend') {
        return frontendConfig;
    } else if (env === 'backend') {
        return backendConfig;
    }
    return [frontendConfig, backendConfig];
};
