import express from 'express';

import fs from 'fs';
import https from 'https';

import bodyParser from 'body-parser';
import _ from 'underscore';
import db_context from './db_context.js';
import bcrypt from 'bcrypt';
import helmet from 'helmet';
import middleware from './middleware/middleware.js';
import authentication from './middleware/middleware_auth.js';
import validateLogin from './shared/loginValidator';
import mailer from 'nodemailer';
import path from 'path';

//import av test data
import TryJSON from '../try_persons';
import AptJSON from '../apt_persons';


/** 
// import for hot-reloading
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.dev.config';
const compiler = webpack(webpackConfig);
*/

var app = express();
var PORT = process.env.PORT || 3000;


/** 
app.use(webpackMiddleware(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
})); */

//app.use(webpackHotMiddleware(compiler));
app.use(bodyParser.json());
app.use(middleware.logger);
app.use(helmet());

// handles request to index.html 
app.use(express.static(__dirname + '/../public'));


// LOGIN TEST URL
app.post('/my_page/login', function (req, res) {
    var body = _.pick(req.body, 'email', 'password');
    const { errors, isValid } = validateLogin(body);

    if (!isValid) {
        res.status(400).json(errors);
    }

    var userInstance;
    db_context.user.authenticate(body).then(function (user) {
        var token = user.generateToken('authentication');
        userInstance = user;
        return token;

    }).then(function (tokenInstance) {
        console.log(tokenInstance);

        res.header('auth', tokenInstance)
            .json(userInstance.toPublicJSON());

    }).catch(function (e) {
        console.log(e);
        res.status(401).send();
    });
});

app.get('/my_page/user', authentication, function (req, res) {
    console.log(req.currentUser);
    // HENTE BRUKER DATA HER
    res.json({
        satan: 'satan'
    });
});

app.post("/reset", authentication, function (req, res) {
    console.log("/reset post")
    var body = _.pick(req.body, 'password');
    console.log(body);

    db_context.user.update({
        password: body.password
    }, {
            where: {
                id: req.currentUser.id,
                email: req.currentUser.email
            },
        }
    ).then(function (result) {
        console.log(result)
        console.log("user password updated");
    });
});

/**
 * lage en auth funksjon for å se om reset link er gyldig, sette utløpsdato på token
 */
app.get('/reset*', function (req, res) {

    res.sendFile(path.join(__dirname + '/../public/index.html'));
});

app.post('/forgot', function (req, res) {
    var body = _.pick(req.body, 'email');

    var userInstance;
    db_context.user.findByEmail(body).then(function (user) {
        var token = user.generateToken('email_token');
        userInstance = user;
        return token;

    }).then(function (token) {
        console.log("token")
        console.log(token);

        var transporter = mailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'aptemailtester1@gmail.com', // Your email id
                pass: 'passord123' // Your password
            }
        });

        var mailOptions = {
            from: 'aptemailtester1@gmail.com', // sender address
            to: 's236313@stud.hioa.no', // list of receivers
            subject: 'TILBAKESTILL PASSORD', // Subject line
            html: '<a href="http://localhost:3000/reset?token='
            + token + '">Tilbakestill passord</a>' // You can choose to send an HTML body instead
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.json({ yo: 'error' });
            } else {
                console.log('Message sent: ' + info.response);
                res.json({ yo: info.response });
            };
        });
    }).catch(function (e) {
        console.log(e);
        res.status(500).send();
    });
});

app.get('/*', function (req, res) {
    console.log("wildcard redirect");
    res.redirect('/');
});


db_context.sequelize.sync({
    force: true
}).then(function (res) {

    for (var i = 0; i < TryJSON.length; i++) {
        var user = TryJSON[i];
        db_context.user.create({
            email: user.email,
            password: 'password'
        })
    }

    for (var i = 0; i < AptJSON.length; i++) {
        var user = AptJSON[i];
        db_context.user.create({
            email: user.email,
            password: 'password'
        })
    }


    db_context.user.create({
        email: 'try@try.no',
        password: 'password'
    })


}).then(function (res) {
    console.log('syncing finished');
/**
    app.listen(PORT, function () {
        console.log('Express server started!' + '\nPORT:' + PORT);
    });
 */

    https.createServer({
        key: fs.readFileSync('key.pem'),
        cert: fs.readFileSync('cert.pem'),
        passphrase: 'hemmelig'
    }, app).listen(PORT, function() {
        console.log('Express server started!' + '\nPORT:' + PORT);
    });


}).catch(function (error) {
    console.log(error);
});





