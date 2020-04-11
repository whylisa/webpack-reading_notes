'use strict';
const TerserPlugin = require("terser-webpack-plugin") 
module.exports = {
    entry: {
			"large-number": "./src/index.js",
			"large-number.min": "./src/index.js"
		},
    output: {
        filename: '[name].js',
				library: "largeNumber", //库的名字
				libraryExport: "default",// 
				libraryTarget: 'umd'//可以使用莫种方式引用
    },
    mode: 'none',
		optimization: {
			minimize: true,
			minimizer: [
				new TerserPlugin({ //压缩es6
					include: /\.min\.js$/,
				})
			]
		}
}