import express from 'express';
import fs from 'fs';
import https from 'https';
import http from 'http'
import _ from 'underscore';
import db_context from './database/db_context';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import middleware from './middleware/middleware.js';
import config from '../config';
import routes from './routes.js';

//import  test data to populate database
import TryJSON from '../try.json';
import AptJSON from '../apt.json';

// import for hot-reloading
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.dev.config';


var app = express();
var PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV != "production") {
    console.log("development");

    const compiler = webpack(webpackConfig);
    app.use(webpackMiddleware(compiler, {
        hot: true,
        publicPath: webpackConfig.output.publicPath,
        noInfo: true
    }));
    app.use(webpackHotMiddleware(compiler));
}
app.use(bodyParser.json());
app.use(middleware.logger);
app.use(helmet());
app.use(express.static(__dirname + '/../public')); // handles request for static files



routes(app);



// Method for creating database
db_context.sequelize.sync({
    force: true
}).then(function (res) {

    for (var i = 0; i < TryJSON.length; i++) {
        var user = TryJSON[i];

        //console.log(user);
        db_context.user.create({
            email: user.email,
            password: 'password',
            vertified: true
        }).then(function (result) {

            db_context.profile.create({
                userId: result.id,
                linkedin: '',
                experience: ''
            });

        });
    }

    for (var i = 0; i < AptJSON.length; i++) {
        var user = AptJSON[i];

        db_context.user.create({
            email: user.email,
            password: 'password',
            vertified: true
        }).then(function (result) {
            db_context.profile.create({
                userId: result.id,
                linkedin: '',
                experience: ''
            });
        });
    }
}

    ).then(function (res) {
        console.log('syncing finished');

        https.createServer({
            key: fs.readFileSync('key.pem'),
            cert: fs.readFileSync('cert.pem'),
            passphrase: 'hemmelig'
        }, app).listen(PORT, function () {
            console.log('Express server started!' + '\nPORT:' + PORT);
        });


    }).catch(function (error) {
        console.log(error);
    });



// forces all every request on http protocol 
// use to https protocol
var HTTP_PORT = 8080;
var HTTPS_PORT = 3000;

var http_app = express();
http_app.set('port', HTTP_PORT);

http_app.get('/*', function (req, res, next) {
    if (/^http$/.test(req.protocol)) {
        var host = req.headers.host.replace(/:[0-9]+$/g, ""); // strip the port # if any

        if ((HTTPS_PORT != null) && HTTPS_PORT !== 443) {
            return res.redirect("https://" + host + ":" + HTTPS_PORT + req.url, 301);
        } else {
            return res.redirect("https://" + host + req.url, 301);
        }
    } else {
        return next();
    }
});

http.createServer(http_app).listen(HTTP_PORT).on('listening', function () {
    return console.log("HTTP to HTTPS redirect app launched.");
});
