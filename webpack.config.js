const path = require('path');
const webpack = require('webpack');

const SOURCE_DIR = path.resolve(__dirname, "src");
const NODE_DIR = path.resolve(__dirname, "node_modules");

var devtool;
if (process.env.NODE_ENV==='test') {
	devtool = 'eval';
}
else if (process.env.NODE_ENV==='dev') {
	devtool = 'source-map';
}
else { // prod
	devtool = 'eval';
}

const config = {
	devtool: devtool,
	entry: [
		'babel-polyfill',
		'./src' ///index'
	],
	output: {
		path: path.resolve(__dirname, './public/build'),
		filename: 'bundle.js',
		publicPath: '/build/',
		sourceMapFilename: 'bundle.js.map',
	},
	/*
	 output: {
	 path: './out/',
	 filename: 'main.js',
	 chunkFilename: '[name]-[chunkhash].js',
	 publicPath: 'http://127.0.0.1:2992/out/'
	 },
	 */
	plugins: [],
	module: {
		loaders: [{
			test: /\.js$/,
			loaders: ['babel-loader'],
			include: SOURCE_DIR
		},
		{
			test: /\.css$/,
			loader: 'style-loader!css-loader'
		}]
	},

	resolve: {
    modules: [
      SOURCE_DIR,
			NODE_DIR
    ],
    extensions: [".js"]
  },

	performance: {
		hints: false
	}
};

if (process.env['NODE_ENV'] === 'dev') {
	config.entry = [
		'react-hot-loader/patch',
		'webpack-hot-middleware/client',
		'./src/index'
	];
	config.plugins.push(new webpack.HotModuleReplacementPlugin());
}
else {
	if (process.env['NODE_ENV'] === 'prod') {
		// config.plugins.push(new webpack.optimize.UglifyJsPlugin({
		// 	compressor: {
		// 		warnings: false
		// 	}
		// }));
	}
}

module.exports = config;
