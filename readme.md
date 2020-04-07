### loaders
    #### 介绍 
	      - webpack开箱即用只支持js和json两种文件类型，通过Loaders去支持其他文件类型并且把他们转化成有效的模块，并且可以添加到依赖图中
		    - 本身是一个函数，接受源文件作文参数，返回转换的结果
		#### 常用Loaders
	      - babel-loader 转换为ES6,ES&等js新特性，语法
				- css-loader 支持.css文件的加载和解析
				- less-loader 将less文件转换为css
				- ts-loader 将TS转换为js
				- file-loader 进行图片、字体等的打包
				- raw-loader 将文件以字符串的形式导入
				- thread-loader 多进程打包js和css
		#### 用法
	      ```js
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
							{test: /\.txt$/,use: 'raw-loader'}//test 指定匹配规则，use指定使用loader的名称
						]
					},
					plugins: {
						new HtmlWebpackPlugin({
							template: './src/index.html' //插件放进去就行了
						})
					}
					mode: 'production'
				}
				```
### plugins
    #### 介绍
	     - 插件用于bundle文件优化，资源管理和环境变量注入，用于构建整个流程
		#### 常用的Plugins
	     - CommonsChunkPlugin 将chunks相同的模块代码提取成公共的js
			 - CleanWebpackPlugin 清理构建目录
			 - ExtractTextWebpackPlugin 将css 从bundle文件中提取成一个独立的css文件
			 - CopyWebpackPlugin 将文件或者文件夹拷贝到构建的输出目录
			 - HtmlWebpackPlugin 创建html文件去承载输出的bundle
			 - UglifyjsWebpackPlugin 压缩js
			 - zipWebpackPlugin 将打包出的资源生成一个zip包
### mode
    #### 介绍
### 解析ES6
    - 使用babel-loader,babel的配置文件，.babelrc