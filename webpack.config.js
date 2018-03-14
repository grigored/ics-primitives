const path = require('path');
const webpack = require('webpack');
// const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const UglifyJs = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: './src/index.ts',

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        sourceMapFilename: 'bundle.js.map',
        libraryTarget: 'commonjs2' // THIS IS THE MOST IMPORTANT LINE! :mindblow: I wasted more than 2 days until realize this was the line most important in all this guide.
    },

    devtool: 'source-map',

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /(node_modules|dist)/,
                loader: 'babel-loader!awesome-typescript-loader',
                // query: {
                //     presets: [require.resolve('babel-preset-es2015')],
                //     plugins: [require.resolve('babel-plugin-transform-runtime')]
                // }
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader",
                exclude: /(node_modules|dist)/,
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /(node_modules|dist)/,
            },
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
        modules: ['.', 'node_modules']
    },

    externals: {
        // 'react': 'commonjs react'
        // "react": "React",
        // "react-dom": "ReactDOM",
        // 'react': 'React',
        // 'react-dom': 'ReactDOM',
        // 'redux': 'Redux',
        // 'react-redux': 'ReactRedux',
        // 'react': 'react',
        // 'react-dom': 'react-dom',
        // 'redux': 'redux',
        // 'react-redux': 'react-redux',
        react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom'
        }
    },
};
