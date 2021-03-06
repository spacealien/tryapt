var path = require('path');
var webpack = require('webpack');
var node_modules_dir = path.join(__dirname, 'node_modules');

var config = {
    entry: [
        'react-hot-loader/patch',
        './client/index.jsx'
    ],
    output: {
        path: path.join(__dirname, '/public/bundle'),
        filename: 'bundle.js',
        publicPath: '/bundle',
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