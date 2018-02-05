const path = require('path');
const webpack = require('webpack');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const UglifyJs = require('uglifyjs-webpack-plugin');
// const UglifyJs = require('uglify-js');

module.exports = {
    entry: './src/redux/create.js',

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        sourceMapFilename: "bundle.js.map",
    },

    devtool: 'source-map',

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                // loaders: [
                //     {
                //         loader: 'babel-loader',
                //         query: {
                //             plugins: ['transform-runtime'],
                //         },
                //     },
                //     {
                //         // loader: 'ts-loader',
                //         loader: 'awesome-typescript-loader',
                //     },
                //     // 'awesome-typescript-loader',
                //     // 'ts-loader',
                // ],
                // query: {
                //     presets: ["es2015", "stage-2"]
                // },
                exclude: /node_modules/,
                // loader: 'babel-loader!ts-loader',
                loader: 'babel-loader!awesome-typescript-loader',
                // options: {
                //     plugins: ['transform-runtime']
                // }
                // loaders: [
                //     'babel-loader',
                //     'ts-loader',
                // ],
                // exclude: [/\.(spec|e2e|d)\.ts$/, /node_modules/],
                // options: {  // << add options with presets env
                //     presets: ['env']
                // }
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader",
                exclude: /node_modules/
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                // options: {
                //     plugins: ['transform-runtime']
                // }
                // loaders: [
                //     'babel-loader',
                // ],
            }, {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            }, {
                test: /\.css$/,
                loader: "style-loader!css-loader",
            }, {
                // test: /\.(png|svg)$/,
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000',
            },
            // { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },
            // { test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },
        ]
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"],
        modules: ['.', 'node_modules']
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new UglifyJs({
            // sourceMap: true,
            uglifyOptions: {
                mangle: true,
                compress: {
                    warnings: false, // Suppress uglification warnings
                    pure_getters: true,
                    unsafe: true,
                    unsafe_comps: true,
                },
                output: {
                    comments: false,
                },
                exclude: [/\.min\.js$/gi] // skip pre-minified libs
            }
        }),
    ]
};
