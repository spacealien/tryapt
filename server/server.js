import express from 'express';
import bodyParser from 'body-parser';
import _ from 'underscore';
import db_context from './db_context.js';
import bcrypt from 'bcrypt';
import middleware from './middleware/middleware.js';
import middleware_auth from './middleware/middleware_auth.js';
import validateLogin from './shared/loginValidator';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.dev.config';
const compiler = webpack(webpackConfig);

var app = express();
var PORT = process.env.PORT || 3000;


app.use(webpackMiddleware(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
}));

app.use(webpackHotMiddleware(compiler));


app.use(bodyParser.json());
app.use(middleware.logger);
app.use(express.static(__dirname + '/../public'));


app.all('/', function (req, res) {
    res.sendFile('/index.html');
});

// LOGIN TEST URL
app.post('/test', function (req, res) {
    var body = _.pick(req.body, 'email', 'password');
    const { errors, isValid } = validateLogin(body);

    if (!isValid) {
        res.status(400).json(errors);
    }

    var userInstance;
    db_context.user.authenticate(body).then(function (user) {
        var token = user.generateToken('authentication');
        userInstance = user;
        return db_context.token.create({ token: token });

    }).then(function (tokenInstance) {
        console.log(userInstance.toPublicJSON());
        console.log(tokenInstance);
        res.header('AUTH', tokenInstance.get('token')).json(userInstance.toPublicJSON());
    }).catch(function (e) {
        console.log(e);
        res.status(401).send();
    });
});


app.get('/hemmelig', middleware_auth.requireAuthentication, function (req, res) {
    res.json({
        satan: 'satan'
    });
});

// serves the index file for all urls
app.all('*', function (req, res) {
    res.redirect('/');
});

db_context.sequelize.sync({
    force: true
}).then(function (res) {
    db_context.user.create({
        email: 'try@try.no',
        password: 'password'
    })
}).then(function (res) {
    console.log('syncing finished');
    //console.log(res);
    app.listen(PORT, function () {
        console.log('Express server started!' + '\nPORT:' + PORT);
    });
}).catch(function (error) {
    console.log(error);
});





