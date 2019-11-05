const webpackMerge = require('webpack-merge');
const commonConf = require('./webpack.common');
const outputFile = '[name]';
const assetFile = '[name]';
const htmlMinifyOption = false;

module.exports = () => webpackMerge(commonConf({ outputFile, assetFile, htmlMinifyOption }), {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        open: true,
        contentBase: './public',
        watchOptions: {
            ignored: /node_modules/
        }
    }
});