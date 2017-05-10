import express from 'express';
import fs from 'fs';
import https from 'https';
import http from 'http';

import bodyParser from 'body-parser';
import _ from 'underscore';
import db_context from './database/db_context';
import bcrypt from 'bcrypt';
import helmet from 'helmet';
import middleware from './middleware/middleware';
import authentication from './middleware/auth';
import resetValidator from './middleware/mail_auth'

import validateLogin from './shared/validation/login_validation';
import mailer from 'nodemailer';
import path from 'path';

import config from '../config';

//import  test data to populate database
import TryJSON from '../try_persons';
import AptJSON from '../apt_persons';

// import for hot-reloading
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.dev.config';

var app = express();
var PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV != 'production') {
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


// LOGIN TEST URL
app.post('/my_page/login', function (req, res) {
    var body = _.pick(req.body, 'email', 'password');
    const { errors, isValid } = validateLogin(body);

    if (!isValid) {
        res.status(400).json({ error: '' })
    }

    var userInstance;
    db_context.user.authenticate(body).then(function (user) {
        var token = user.generateToken('authentication');
        userInstance = user;
        return token;
    }).then(function (token) {
        res.json({ token });

    }).catch(function (e) {
        console.log(e);
        res.status(401).json({ errors: 'Ugyldig brukernavn/passord' }).send();
    });
});


// updates user profile
app.put('/my_page/user/update', authentication, function (req, res) {
    var body = _.pick(req.body, 'user', 'profile');
    var attributes = {};

    if (body.profile.linkedin) {
        attributes.linkedin = body.profile.linkedin;
    }

    if (body.profile.experience) {
        attributes.experience = body.profile.experience;
    }

    db_context.profile.findOne({
        where: {
            userId: req.body.user
        }
    }).then(function (profile) {
        if (profile) {
            profile.update(attributes).then(

                function (profile) {
                    res.json(profile.toJSON());
                },
                function (error) {
                    res.status(400).json({ error: '' });
                },
                function () {
                    res.status(500).send();
                }
            );
        }
    });
});

// finds public profile
app.get('/people/details', function (req, res) {
    var body = _.pick(req.body, 'email');

    db_context.user.findOne({
        where: {
            email: body.email
        }
    }).then( function(user) {
        user.getProfile({
            where: {
                userId: user.id
            }
        }).then( function(profile) {
            res.status(200).json({profile: profile})
        });
    });
});

// HER SKAL SYKEDAGER OG FRAVÆR SENDES MED HER
app.get('/my_page/user', authentication, function (req, res) {
    var body = _.pick(req.body, 'email');

    // db_context.profile.findOne({
    //     where: {
    //         email: body.email
    //     }
    // }).then(
    //     function (profile) {
    //         res.status(200).json({
    //             profile: profile
    //         });
    //     },
    //     function (error) {

    //     },
    //     function () {

    //     });
});

app.post("/reset", authentication, function (req, res) {
    var body = _.pick(req.body, 'password');

    db_context.user.update({
        password: body.password
    }, {
            where: {
                id: req.currentUser.id,
                email: req.currentUser.email
            },
        }
    ).then(function (result) {
        res.status(200).send();
    });
});

app.post('/register', function (req, res) {

});


/**
 * lage en auth funksjon for å se om reset link er gyldig, sette utløpsdato på token
 */
app.get('/reset*', function (req, res) {
    res.sendFile(path.join(__dirname + '/../public/index.html'));
});

app.post('/forgot', function (req, res) {
    var body = _.pick(req.body, 'email');

    db_context.user.findByEmail(body).then(function (user) {
        var token = user.generateToken('email_token');

        return {
            user: user,
            token: token
        };
    }).then(function (e) {
        var transporter = mailer.createTransport(config.mailer.transport);

        concosle.log(e.user);
        var mailOptions = config.mailOptions;
        mailOptions.to = 's236313@stud.hioa.no';
        mailOptions.html = '<a href="https://localhost:3000/reset?token='
            + e.token + '">Tilbakestill passord</a>' // You can choose to send an HTML body instead;

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                res.status(503).json({ errors: 'Epost tjeneste ikke tilgjengelig' });
            } else {
                res.status(200).json({ message: info.response });
            };
        });
    }).catch(function (e) {
        res.status(500).json({ errors: 'En feil har oppstått' }).send();
    });
});

app.get('/*', function (req, res) {
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
        }).then(function (result) {
            console.log(result.id);
            db_context.profile.create({
                userId: result.id,
                linkedin: result.email,
                experience: result.email
            });
        });
    }

    for (var i = 0; i < AptJSON.length; i++) {
        var user = AptJSON[i];
        db_context.user.create({
            email: user.email,
            password: 'password'
        }).then(function (result) {

            db_context.profile.create({
                userId: result.id
            });
        });
    }

    db_context.user.create({
        email: 'try@try.no',
        password: 'password'
    });


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
    }, app).listen(PORT, function () {
        console.log('Express server started!' + '\nPORT:' + PORT);
    });


}).catch(function (error) {
    console.log(error);
});





