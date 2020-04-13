const WebpackMerge = require('webpack-merge')
const webpack = require('webpack');
const baseConfig = require('/webpack.base')

const devConfig = {
	mode: 'production',
	plugins: [
	    new webpack.HotModuleReplacementPlugin(),
	],
	devtool: 'source-map', 
	devServer: {
	    contentBase: './dist',
	    hot: true,
			stats: 'errors-only'
	}
}
module.exports = merge(baseConfig,devConfig)