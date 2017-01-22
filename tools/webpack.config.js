'use strict';

const path = require('path'),
      webpack = require('webpack'),
      utils = require('steamer-webpack-utils');

var config = require('./config'),
    configWebpack = config.webpack;

var Clean = require('clean-webpack-plugin'),
    PostcssImport = require('postcss-import'),
    Autoprefixer = require('autoprefixer'),
    PostcssImport = require('postcss-import'),
    Autoprefixer = require('autoprefixer'),
    HtmlResWebpackPlugin = require('html-res-webpack-plugin'),
    ExtractTextPlugin = require("extract-text-webpack-plugin-steamer");

var devConfig = {
    entry: {
        "index": path.join(configWebpack.path.example, "src/index.js"),
    },
    output: {
        path: path.join(configWebpack.path.example, "dev"),
        filename: "index.js",
        publicPath: "//steamer-video.com/",
    },
    module: {
        loaders: [
            { 
                test: /\.js$/,
                loader: 'babel',
                query: {
                    cacheDirectory: './.webpack_cache/',
                    presets: [
                        ["es2015", {"loose": true}],
                        'react',
                        'stage-0'
                    ]
                },
                exclude: /node_modules/,
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style', 'css?-autoprefixer&localIdentName=[name]-[local]-[hash:base64:5]!postcss!less?root=' + path.resolve('src')),
                include: [configWebpack.path.example, configWebpack.path.build],
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    "url-loader?limit=1000&name=img/[path]/[name].[ext]",
                ],
                // include: path.resolve(configWebpack.path.src)
            },
        ],
        noParse: [
            
        ]
    },
    postcss: function(webpack) { 
        return [
            PostcssImport(),
            Autoprefixer() 
        ]
    },
    resolve: {
        root: [
            path.resolve(configWebpack.path.src)
        ],
        moduledirectories:['node_modules', configWebpack.path.src],
        extensions: ["", ".js", ".jsx", ".es6", "css", "scss", "less", "png", "jpg", "jpeg", "ico"],
        alias: {
        }
    },
    plugins: [
        // remove previous build folder
        new Clean(['example/dev'], {root: path.resolve()}),
        new webpack.optimize.OccurenceOrderPlugin(),
        new ExtractTextPlugin("./css/[name].css", {filenamefilter: function(filename) {
            // 由于entry里的chunk现在都带上了js/，因此，这些chunk require的css文件，前面也会带上./js的路径
            // 因此要去掉才能生成到正确的路径/css/xxx.css，否则会变成/css/js/xxx.css
            return filename.replace('/js', '');
        }}),
        new webpack.NoErrorsPlugin()
    ],
    watch: true, //  watch mode
    // 是否添加source-map，可去掉注释开启
    // devtool: "#inline-source-map",
};

utils.addPlugins(devConfig, HtmlResWebpackPlugin, {
    mode: "html",
    filename: "index.html",
    template: "example/src/index.html",
    favicon: "src/favicon.ico",
    htmlMinify: null,
    entryLog: true,
    templateContent: function(tpl) {
        return tpl;
    }
});

module.exports = devConfig;