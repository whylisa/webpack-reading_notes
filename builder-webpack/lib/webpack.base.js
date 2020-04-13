const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const glob = require('glob');

const setMPA = () => {
	    const entry = {};
	    const htmlWebpackPlugins = [];
	    const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'));

	    Object.keys(entryFiles)
	        .map((index) => {
	            const entryFile = entryFiles[index];
	            // '/Users/cpselvis/my-project/src/index/index.js'

	            const match = entryFile.match(/src\/(.*)\/index\.js/);
	            const pageName = match && match[1];

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
	                        removeComments: false,
	                    },
	                }),
	            );
	        });

	    return {
	        entry,
	        htmlWebpackPlugins,
	    };
};

const { entry, htmlWebpackPlugins } = setMPA();
module.exports = {
  entry,
  module: {
	    rules: [
	        // test: 指定匹配规则
	        // use: 指定使用的loaders名称
	        {
	            test: /.js$/,
	            use: [
          'babel-loader',
          'eslint-loader',
        ],
	        },
	        {
	            test: /.css$/,
	            use: [
	                MiniCssExtractPlugin.loader,
	                'css-loader',
	            ],
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
	                                overrideBrowserslist: ['last 2 version', '>1%', 'ios 7'], // 高版本
	                            }),
	                        ],
	                    },
	                },
	                {
	                    loader: 'px2rem-loader',
	                    options: {
	                        remUnit: 75, // 代表 1rem = 75px 适合 750的视觉稿
	                        remPrecesion: 8, // 代表px转换成rem后，小数点位数
	                    },
	                },
	            ],
	        },
	        // 使用file-loader
	        {
	            test: /.(png|jpg|gif|jpeg)$/,
	            use: [
	                {
	                    loader: 'file-loader',
	                    options: {
	                        name: '[name]_[hash:8].[ext]',
	                    },
	                },
	            ],
	        },
	        {
	            test: /.(woff|woff2|eot|ttf|otf)$/,
	            use: [
	                {
	                    loader: 'file-loader',
	                    options: {
	                        name: '[name]_[hash:8].[ext]',
	                    },
	                },
	            ],
	        },
	    ],
  },
  plugins: [
	    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
			    filename: '[name]_[contenthash:8].css',
    }),
    new FriendlyErrorsWebpackPlugin(),

    function () {
      this.hooks.done.tap('done', (stats) => {
        if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') === -1) {
          console.log('build error');
          process.exit(1);
        }
      });
    },
  ].concat(htmlWebpackPlugins),
  stats: 'errors-only',
};
