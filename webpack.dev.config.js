var path = require('path');
var webpack = require('webpack');
var node_modules_dir = path.join(__dirname, 'node_modules');

var config = {
    devtool: 'eval source-map',
    entry: [
        'webpack-hot-middleware/client',
        './client/index.jsx'
    ],
    output: {
        path: path.join(__dirname, '/public/bundle'),
        filename: 'bundle.js',
        publicPath: '/bundle',
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: 'public'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: ['babel-loader'],
                exclude: /node_modules/,

            }
        ]
    }
};
module.exports = config;