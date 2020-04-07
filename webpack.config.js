'use strict'
//模块打包器
const path = require('path')
module.exports = {
	// entry: './src/index.js',//用来指定打包的入口
	// 多入口entry是一个object对象
	
	entry: {
		index: './src/index.js',
		search: './src/search.js'
	},
	output: {//打包输出，将编译的文件输出到磁盘，可以通过output进行指定
		path: path.join(__dirname,'dist'),
		// filename: 'bundle.js', //指定打包文件的名称(单页面)
		filename: '[name].js', //指定打包文件的名称(多页面)占位符的概念，通过占位符，确保文件唯一
	},
	module: {
		rules: [
			{
				test: /.js$/,
				use: 'babel-loader'
			}
		]
	}
	mode: 'production'
}