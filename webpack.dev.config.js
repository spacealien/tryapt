var path = require('path');
var webpack = require('webpack');
var node_modules_dir = path.join(__dirname, 'node_modules');

var config = {
    entry: [
        'webpack-hot-middleware/client',
        './src/index.jsx'
    ],
    output: {
        path: path.join(__dirname, 'public/bundle'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    devtool: 'source-map',
    devServer: {
        contentBase: 'public'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: ['react-hot-loader', 'babel-loader'],
                exclude: /node_modules/,

            }
        ]
    }
};
module.exports = config;