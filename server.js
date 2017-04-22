var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var db_context = require('./db_context.js');
var bcrypt = require('bcrypt');
var middleware = require('./middleware.js');
var middleware_auth = require('./middleware_auth.js');

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(middleware.logger);
app.use(express.static(__dirname + '/public'));


(express.static(__dirname + '/public'));

app.all('/', function (req, res) {
    res.sendFile('/index.html');
});

var mw = middleware;

// LOGIN TEST URL
app.post('/test', function (req, res) {

    var body = _.pick(req.body, 'email', 'password');
    console.log(body);
    var userInstance;

    db_context.user.authenticate(body).then( function(user) {
        var token = user.generateToken('authentication');
        userInstance = user;

        return db_context.token.create({ token: token });

    }).then(function (tokenInstance) {
        res.header('AUTH', tokenInstance.get('token')).json(userInstance.toPublicJSON());
    }).catch(function (e) {
        res.status(401).send();
    });
});


app.get('/hemmelig',middleware_auth.requireAuthentication ,function(req,res) {
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
    //console.log(error);
});





