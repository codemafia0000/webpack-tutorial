const path = require('path');
const { ProvidePlugin } = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = ({ outputFile, assetFile, htmlMinifyOption }) => ({
    entry: { app: './src/js/app.js', sub: './src/js/sub.js' },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: `${outputFile}.js`,
        chunkFilename: `${outputFile}.js`,
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    fix: true
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // or style-loader
                    // 'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(jpe?g|gif|png|svg|woff2?|ttf|eot)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: `${assetFile}.[ext]`,
                        outputPath: 'images',
                        publicPath: 'images'
                    }
                }
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `${outputFile}.css`
        }),
        new ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            utils: [path.resolve(__dirname, 'src/js/utils'), 'default']
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            inject: 'body',
            chunks: ['app'],
            minify: htmlMinifyOption
        }),
        new HtmlWebpackPlugin({
            template: './src/other.html',
            filename: 'other.html',
            inject: 'body',
            chunks: ['sub'],
            minify: htmlMinifyOption
        })
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 0,
            cacheGroups: {
                vendors: {
                    name: "vendors",
                    test: /node_modules/,
                    priority: -10
                },
                utils: {
                    name: "utils",
                    test: /src[\\/]/,
                    chunks: "initial" 
                },
                default: false
            }
        }
    },
    resolve: {
        alias: {
            '@scss': path.resolve(__dirname, 'src/scss'),
            '@imgs': path.resolve(__dirname, 'src/images')
        },
        extensions: ['.js','.scss'],
        modules: [path.resolve(__dirname, 'src'), 'node_modules']
    }
});

