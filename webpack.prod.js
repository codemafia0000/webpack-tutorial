const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const webpackMerge = require('webpack-merge');
const commonConf = require('./webpack.common');
const outputFile = '[name].[chunkhash]';
const assetFile = '[contenthash]';
const htmlMinifyOption = {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true
};

module.exports = () => webpackMerge(commonConf({ outputFile, assetFile, htmlMinifyOption }), {
    mode: 'production',
    optimization: {
        minimizer: [
            new TerserPlugin(),
            new OptimizeCssPlugin()
        ],
    }
});