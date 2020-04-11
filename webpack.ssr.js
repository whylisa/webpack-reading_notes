'use strict';

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptionsCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')

const glob = require('glob');

const setMPA = () => {
    const entry = {};
    const htmlWebpackPlugins = [];
    const entryFiles = glob.sync(path.join(__dirname, './src/*/index-server.js'));

    Object.keys(entryFiles)
        .map((index) => {
            const entryFile = entryFiles[index];
            // '/Users/cpselvis/my-project/src/index/index.js'

            const match = entryFile.match(/src\/(.*)\/index-server\.js/);
            const pageName = match && match[1];
            if(pageName) {
							entry[pageName] = entryFile;
							htmlWebpackPlugins.push(
							    new HtmlWebpackPlugin({
							        inlineSource: '.css$',
							        template: path.join(__dirname, `src/${pageName}/index.html`),
							        filename: `${pageName}.html`,
							        chunks: ['vendors', pageName],
							        inject: true,
							        minify: {
							            html5: true,
							            collapseWhitespace: true,
							            preserveLineBreaks: false,
							            minifyCSS: true,
							            minifyJS: true,
							            removeComments: false
							        }
							    })
							);
						}
          
        });

    return {
        entry,
        htmlWebpackPlugins
    }
}

const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
    entry: entry,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]-server.js',
				libraryTarget: 'umd'
    },
    mode: 'production',
    module: {
        rules: [
            // test: 指定匹配规则
            // use: 指定使用的loaders名称
            { 
                test: /.js$/, 
                use: [
									'babel-loader',
									'eslint-loader'
								]
            },
            {
                test: /.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer')({
                                    // browsers: ['last 2 version', '>1%', 'ios 7']
                                    overrideBrowserslist: ['last 2 version', '>1%', 'ios 7']  // 高版本
                                })
                            ]
                        }
                    },
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75, // 代表 1rem = 75px 适合 750的视觉稿
                            remPrecesion: 8 // 代表px转换成rem后，小数点位数
                        }
                    }
                ]
            },
            // 使用file-loader
            {
                test: /.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8].[ext]',
														esModule: false
                        }
                    }
                ]
            },
            {
                test: /.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'
        }),
        new OptionsCssAssetsWebpackPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano')
        }),
				// new HtmlWebpackExternalsPlugin({
				// 	externals: [
				// 		{
				// 			module: 'react',
				// 			entry: 'https://11.url.cn/now/lib/16.2.0/react.min.js',
				// 			global: 'React'
				// 		},
				// 		{
				// 			module: 'react-dom',
				// 			entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
				// 			global: 'ReactDOM'
				// 		}
				// 	]
				// })
    ].concat(htmlWebpackPlugins),
    // devtool: 'inline-source-map',内容和js在一起
    // devtool: 'source-map',
		optimization: {
			splitChunks: {
				cacheGroups: {
					commons: {
						test: /(react|react-dom)/,
						name: 'vendors',
						chunks: 'all'
					}
				}
			}
		}
		// optimization: {
		// 	splitChunks: {
		// 		minSize: 0,
		// 		cacheGroups: {
		// 			commons: {
		// 				name: 'commons',//打成commons文件,要加上new webpack chunks中
		// 				chunks: 'all',
		// 				minChunks: 2
		// 			}
		// 		}
		// 	}
		// }
}