var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var db_context = require('./db_context.js');

var app = express();
var PORT = process.env.PORT || 3000;

/** 
var config = require('./webpack.config.js');
var compiler = webpack(config);

// middleware
app.use(require("webpack-dev-middleware") (compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(require("webpack-hot-middleware") (compiler, {
    log: console.log,
    path: '/__webpack_hmr', heartbeat: 10 * 1000
}) );
*/

var middleware = require('./middleware.js');
app.use(bodyParser.json());
app.use(middleware.logger);
//app.use(middleware.requireAuthentication);
app.use(express.static(__dirname + '/public'));


app.all('/', function (req, res) {
    res.sendFile('/index.html');
});


app.post('/test', function (req, res) {
    var body = _.pick(req.body, 'email', 'password');

    console.log(body);

    if (typeof body.email !== 'string' || typeof body.password !== 'string') {
        return res.status(400).send();
    }

    db_context.user.findOne({
        where: {
            email: body.email
        }
    }).then(function (user) {
        console.log(user);
        if (!user) {
            return res.status(401);
        }
    }, function (error) {
        console.log(error);
    });
});


// serves the index file for all urls
app.all('*', function (req, res) {
    res.redirect('/');
});


db_context.sequelize.sync({
    force: true
}).then(function (res) {
    console.log('syncing finished');
    //console.log(res);

    app.listen(PORT, function () {
        console.log('Express server started!' + '\nPORT:' + PORT);
    });
}).catch(function (error) {
    concosle.log(error);
});





