var path = require('path');

var env = process.env.NODE_ENV;

var preLoaders = env === 'dev' ? [{
	test: /\.js$/,
	loader: 'eslint-loader',
	exclude: /node_modules/,
	include: [path.join(__dirname, 'src')]
}] : null;

module.exports = function (config) {

	config.set({

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: './',

		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['mocha'],

		client: {
			mocha: {
				timeout: 15000
			}
		},

		// list of files / patterns to load in the browser
		files: [
			'test.index.js'
		],

		// list of files to exclude
		exclude: [],

		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			'test.index.js': ['webpack']
		},

		// Webpack
		webpack: {
			devtool: 'eval',
			output: {
				pathinfo: true
			},
			eslint: {
				configFile: '.eslintrc',
				emitWarning: true,
				emitError: true,
				formatter: require('eslint-friendly-formatter')
			},

			module: Object.assign({

				loaders: [
					{
						test: /\.js$/,
						loaders: ['babel'],
						exclude: /node_modules/
					}
				]
			}, preLoaders)

		},

		// Webpack middleware
		webpackMiddleware: {
			noInfo: true
		},

		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['mocha'],

		// web server port
		port: 9876,

		// enable / disable colors in the output (reporters and logs)
		colors: true,

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,

		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ['Chrome'],

		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: false,

		// Concurrency level
		// how many browser should be started simultaneous
		concurrency: Infinity
	})
};