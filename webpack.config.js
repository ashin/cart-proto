const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const validate = require('webpack-validator');

const buildProcess = require('./libs/buildProcesses.js');
const PATHS = {
	app: path.join(__dirname, 'app'),
	style: [
		path.join(__dirname, 'app', 'main.css')
	],
	build: path.join(__dirname, 'build'),
	htmlTemplate: path.join(__dirname, 'app', 'index.ejs')
};
const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

const common = {
	resolve: {
		extensions: ['', '.js']
	},
	entry: {
		style: PATHS.style,
		app: PATHS.app
	},
	target: 'web',
	output: {
		path: PATHS.build,
		filename: '[name].js',
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: PATHS.htmlTemplate
		}),
		new ExtractTextPlugin('[name].[chunkhash].css')
	],
	module: {
		preLoaders: [
			// {
			// 	test: /\.js?$/,
			// 	loaders: ['eslint'],
			// 	include: PATHS.app
			// }
		],
		loaders: [
			{
				test: /\.js?$/,
				loaders: ['babel?cacheDirectory'],
				include: PATHS.app
			},
            {
            	test: /\.(jpg|png)$/,
            	loader: 'url?limit=25000',
            	include: PATHS.app
            },
            {
		        test: /.*\.(gif|png|jpe?g|svg)$/i,
		        loaders: [
			    	'file?hash=sha512&digest=hex&name=[hash].[ext]',
			    	'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
			    ]
	      	},
	      	{
	      		test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                include: PATHS.app,
				loader: 'url',
	      		query: {
	      			limit: 50000,
	      			mimetype: 'application/font-woff',
	      			name: './fonts/[hash].[ext]'
	      		}
	      	}
		],
	}
};

var config;

switch(process.env.npm_lifecycle_event){
	case 'build':
	case 'stats':
		config = merge(
			common,
			{
				resolve: {
					alias: {
						'react': 'react-lite',
						'react-dom': 'react-lite'
					}
				},
	        	devtool: 'source-map',
	        	output: {
	        		path: PATHS.build,
	        		publicPath: '/webpack-demo/',
	        		filename: '[name].[chunkhash].js',
	        		chunkFilename: '[chunkhash].js'
	        	},
	        	externals: {
					'cheerio': 'window',
					'react/lib/ExecutionEnvironment': true,
					'react/lib/ReactContext': true,
				}
	      	},
	      	buildProcess.clean(PATHS.build),
	      	buildProcess.dedupe(PATHS.app),
	      	buildProcess.setFreeVariable(
		    	'process.env.NODE_ENV',
		    	'production'
	      	),
	      	buildProcess.extractBundle({
	      		name: 'vendor',
	      		entries: ['react']
	      	}),
	      	buildProcess.minify(),
	      	buildProcess.setupCSS(PATHS.app, true)
		);
		break;

	default:
		config = merge(
			common,
			buildProcess.devServer({
				host: process.env.HOST,
				port: process.env.PORT
			}),
			buildProcess.setupCSS(PATHS.app),
			{
	        	devtool: 'eval-source-map'
	      	}
		);
};

// quiet mode stops logging of stats
module.exports = validate(config, {
	quiet: true
});