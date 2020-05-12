const path = require("path");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const tailwindcss = require("tailwindcss");
const AssetsPlugin = require("assets-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const fs = require("fs");

// Make sure any symlinks in the project folder are resolved:
const appDirectory = fs.realpathSync(process.cwd());

function resolveApp(relativePath) {
    return path.resolve(appDirectory, relativePath);
}

const paths = {
    appSrc: resolveApp('src'),
    // *** Update this location
    appBuild: resolveApp('../public/assets'),
    appIndexJs: resolveApp('src/index.js'),
    appNodeModules: resolveApp("node_modules")
};

const DEV = process.env.NODE_ENV === "development";

module.exports = {
    bail: !DEV,
    mode: 'development',
    // Generate source maps in production
    target: "web",
    devtool: DEV ? "cheap-eval-source-map" : "source-map",
    entry: [paths.appIndexJs],
    output: {
        path: paths.appBuild,
        filename: DEV ? "scripts/bundle.js" : "scripts/bundle.[hash:8].js"
    },
    optimization: {
        minimizer: [new OptimizeCSSAssetsPlugin({})]
    },
    module: {
        rules: [
            {
                // transform ES6 w/ babel
                test: /\.js?$/,
                loader: "babel-loader",
                include: paths.appSrc
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                    loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: DEV ? 'styles/[name].css' : 'styles/[name].[hash].css',
            chunkFilename: DEV ? 'styles/[id].css' : 'styles/[id].[hash].css',
        }),
        new webpack.EnvironmentPlugin({
            NODE_ENV: "development",
            DEBUG: false
        }),
        new AssetsPlugin({
            path: paths.appBuild,
            filename: "assets.json"
        }),
        DEV &&
            new FriendlyErrorsPlugin({
                clearConsole: false
            }),
        DEV &&
            new BrowserSyncPlugin({
                host: "localhost",
                port: 4000,
                ui: {
                    port: 4001
                },
                logLevel: "silent",
                // *** Update setting here
                files: [
                    "templates/**/*.twig",
                    "templates/**/*.html",
                    "assets/styles/**/*.css",
                ],
                proxy: 'http://gap.local/',
                open: false,
            })
    ].filter(Boolean)
};
