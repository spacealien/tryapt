var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var db_context = require('./db_context.js');
var bcrypt = require('bcrypt');
var middleware = require('./middleware.js');

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(middleware.logger);
//app.use(middleware.requireAuthentication);
app.use(express.static(__dirname + '/public'));

app.all('/', function (req, res) {
    res.sendFile('/index.html');
});

// LOGIN TEST URL
app.post('/test', middleware.requireAuthentication, function (req, res) {
    var body = _.pick(req.body, 'email', 'password');

    db_context.user.authenticate(body).then(function (user) {
        res.header('AUTH', user.generateToken('auth')).json(user.toPublicJSON());
    }, function () {
        res.status(401).send();
    }).catch(function (e) {
        console.log(e);
    });
});

// serves the index file for all urls
app.all('*', function (req, res) {
    res.redirect('/');
});

db_context.sequelize.sync({
    force: true
})
    .then(function (res) {
        db_context.user.create({
            email: 'try@try.no',
            password: 'password'
        })
    })

    .then(function (res) {
        console.log('syncing finished');
        //console.log(res);
        app.listen(PORT, function () {
            console.log('Express server started!' + '\nPORT:' + PORT);
        });
    }).catch(function (error) {
        //console.log(error);
    });





