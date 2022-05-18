const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

process.env.NODE_ENV = 'development';

module.exports = {
    mode: 'development',
    target: 'web',
    devtool: 'cheap-module-source-map',
    resolve: {
      fallback: {
        "path": false
      } 
    },
    entry: './src/index',
    output: {
        path : path.resolve(__dirname, "build"),
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        stats: 'minimal',
        overlay: true,
        historyApiFallback: true,
        disableHostCheck: true,
        headers: {"Acces-Control-Allow-Origin": "*"},
        https: false
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env":{
                "BACK4APP_API_URL": JSON.stringify("https://parseapi.back4app.com"),
                "BACK4APP_APP_ID": JSON.stringify("pen8j01Zc3JaqVkHmMCbZud1AhOaOMeBYTpzlUhw"),
                "BACK4APP_REST_API_KEY": JSON.stringify("GWAMpyqKg5rhHbE9ueXXFdjD3vF3n980YzHRE8SG"),
                "MOCK_API": JSON.stringify(false)
            }
        }),
        new HtmlWebpackPlugin({
            template: "src/index.html",
            favicon: "src/favicon.ico"
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader", "eslint-loader"]
            },
            {
                test: /(\.css)$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    }
};