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
### 解析react
    - 使用@babel/preset-react
		- less-loader less  style-loader css-loader
		- 图片解析 file-loader/url-loader
		- 字体解析 file-loader/url-loader
	  - 文件监听 是在发现源码变化时自动构建出新的输出文件
		- webpack开启文件监听模式，有两种方式：1启动webpack命令时，带上--watch参数2在配置webpack.config.js中设置watch:true,自动编译自动构建，需要手动刷新浏览器
		- 原理分析：轮训判断文件的最后编辑时间是否变化，某个文件发生了变化，并不会立即告诉监听着而是先缓存起来，等aggregateTimemout
		```js
		module.export = {
			//默认false
			watch: true,
			//只有开启监听模式时，watchOptions才有意义
			watchOptions: {
				//默认为空，不监听的文件或者文件夹，支持正则匹配
				ignored: /node_modules/
				//监听到变化发生后会等300ms再去执行，默认300
				aggregateTimeout: 300
				//判断文件是否发生变化是通过不停询问系统指定的文件有没有变化实现的，默认每秒问1000次
				poll: 1000
			}
		}
		```
		- 热更新：webpack-dev-server,wds不刷新浏览器，wds不输出文件，而是放在内存中（无磁盘IO），使用HotModulePrplacementPlugin插件
		- 文件指纹: 打包后输出的文件名的后缀
		- hash：和整个项目的构建相关，只要项目文件有修改，整个项目构建的hash值就会更改
		- chunkhash: 和webpack打包的chunk有关，不同的entry会生成不同的chunkhash值
		- contenthash: 根据文件内容来定义hash,文件内容不变，则contenthash不变

### 代码压缩
    - html html-webpack-plugin  处理换行，注释，空格
		- css optimize-css-assets-webpack-plugin  同时使用cssnano
		- js uglifyjs-webpack-plugin wed4已经默认开启了
### 自动清理构建目录产物
    - 当前构建时的问题：每次构建的时候不会清理目录，造成构建输出目录output文件越来越多
		- 通过npm scripts 清理构建目录 ： rm -rf ./dist &&webpack,rimraf ./dist && webpack
		- 使用插件 避免每次构建都要手动删除dist  clean-webpack-plugin 默认会删除output 指定的输出目录
### postCSS自动补全前缀
    - autoPrefixer 插件
		- css 装换rem px2rem-loader
### 资源内联
    - 代码层面：页面框架的初始化脚本，上报相关打点，css内联避免页面闪动
		- 请求层面：减少http请求，小图片或者字体内联（url-loader）
		- raw-loader 内联js,html .5的版本:
    -css 内联 style-loader html-inline-css-webpack-plugin