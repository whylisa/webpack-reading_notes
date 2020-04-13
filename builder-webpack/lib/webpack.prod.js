const WebpackMerge = require('webpack-merge')
const OptionsCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const baseConfig = require('./webpack.base')
const prodConfig = {
	mode: 'production',
	plugins: [
	    new OptionsCssAssetsWebpackPlugin({
	        assetNameRegExp: /\.css$/g,
	        cssProcessor: require('cssnano')
	    }),
			new HtmlWebpackExternalsPlugin({ //公共资源包
				externals: [
					{
						module: 'react',
						entry: 'https://11.url.cn/now/lib/16.2.0/react.min.js',
						global: 'React'
					},
					{
						module: 'react-dom',
						entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
						global: 'ReactDOM'
					}
				]
			}),
			],
			optimization: {
				splitChunks: {
					minSize: 0,
					cacheGroups: {
						commons: {
							name: 'commons',//打成commons文件,要加上new webpack chunks中
							chunks: 'all',
							minChunks: 2
						}
					}
				}
			}
}
mudule.exports = merge()