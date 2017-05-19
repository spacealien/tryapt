import express from 'express';
import fs from 'fs';
import https from 'https';
import http from 'http'


import bodyParser from 'body-parser';
import _ from 'underscore';
import db_context from './database/db_context';
import bcrypt from 'bcrypt';
import helmet from 'helmet';
import request from 'request';
import middleware from './middleware/middleware';
import authentication from './middleware/auth';
import mailAuthentication from './middleware/mail_auth';

import validateLogin from './shared/validation/login_validation';
import mailer from 'nodemailer';
import path from 'path';
import jwt from 'jsonwebtoken';

import config from '../config';

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


// Login post request 
app.post('/my_page/login', function (req, res) {
    var body = _.pick(req.body, 'email', 'password');
    const { errors, isValid } = validateLogin(body);

    if (!isValid) {
        res.status(400).json({ error: '' })
    }

    var userInstance;

    // Uses class method in user model to authenticate user.
    db_context.user.authenticate(body).then(function (user) {
        var token = user.generateToken('authentication');
        userInstance = user;
        return token;

    }).then(function (token) {
        res.json({ token });
    }).catch(function (e) {
        console.log(e);
        res.status(401).json({
            error: {
                message: 'Ingen bruker med epost/passord'
            }
        });
    });
});



// Get method for fetching employees from json file 
app.get('/api/people', function (req, res) {
    var body = _.pick(req.body, 'email');

    var employees = {};

    var count = 0;
    var handler = function (error, content) {
        count++;
        if (error) {
            console.log(error);
        }
        else {
            var jsonData = JSON.parse(content);
            if (jsonData[0].company == 'apt') {
                employees.apt = jsonData;
            } else if (jsonData[0].company == 'try') {
                employees.try = jsonData;
            } else if (jsonData[0].company == 'opt') {
                employees.opt = jsonData;
            }
        }

        if (count == 3) {
            res.status(200).json({ employees: employees });
        }
    }
    // Uses async handler for reading file.
    fs.readFile('apt.json', handler),
        fs.readFile('try.json', handler),
        fs.readFile('opt.json', handler)
});


// Get method for fetching employees from json file 
app.get('/api/people/emlpoyee', function (req, res) {
    var body = _.pick(req.body, 'email');

    var employees = {};

    var count = 0;
    var handler = function (error, content) {
        count++;
        if (error) {
            console.log(error);
        }
        else {
            var jsonData = JSON.parse(content);
            if (jsonData[0].company == 'apt') {
                employees.apt = jsonData;
            } else if (jsonData[0].company == 'try') {
                employees.try = jsonData;
            } else if (jsonData[0].company == 'opt') {
                employees.opt = jsonData;
            }
        }

        if (count == 3) {
            res.status(200).json({ employees: employees });
        }
    }

    //metoden starter egetnlig her
    if (body.email.includes('@apt.no')) {
        fs.readFile('apt.json', handler);
    } else if (body.email.includes('@try.no')) {
        fs.readFile('try.json', handler);
    } else {
        fs.readFile('opt.json', handler)
    }
});



// Finds public profile
app.post('/api/people/profile', function (req, res) {
    var body = _.pick(req.body, 'email');

    db_context.user.findOne({
        where: {
            email: body.email
        }
    }).then(function (user) {

        if (user) {
            user.getProfile({
                where: {
                    userId: user.id
                }
            }).then(function (profile) {
                res.status(200).json({ profile: profile })
            });
        } else {
            res.status().json({ message: 'bruker med epost ekisterer ikke' });
        }
    }).catch(function (error) {
        console.log(error);
    });
});


// Updates user profile
app.post('/my_page/profile/update', authentication, function (req, res) {
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
            userId: req.currentUser.id
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
                    res.status(500).json().send();
                }
            );
        }
    });

}); //end /my_page/update


app.post('/api/user/register', function (req, res) {
    console.log(req.body);
    var body = _.pick(req.body, 'email', 'password');
    console.log(body);

    var list = {};
    var count = 0;
    var isEmployee = false;

    // creates handler for register employee
    var handler = function (error, content) {
        count++;
        if (error) {
            console.log(error);
        }
        else {
            var jsonData = JSON.parse(content);

            if (jsonData[0].company == 'apt') {
                list = jsonData;
            } else if (jsonData[0].company == 'try') {
                list = jsonData;
            } else if (jsonData[0].company == 'opt') {
                list = jsonData;
            }
        }

        if (count == 1) {
            var employee = {}

            list.map(function (emp) {
                if (emp.email === body.email) {
                    isEmployee = true;
                    employee.email = emp.email;
                }
            }); // end map

            if (isEmployee) {
                console.log('isEmployee');

                db_context.user.create({
                    email: body.email,
                    password: body.password,
                }).then(function (result) {
                    console.log(result);
                    db_context.profile.create({
                        userId: result.id,
                        linkedin: null,
                        experience: null,
                    });
                }).catch(function (e) {
                    res.status(500).json({ errors: 'En feil har oppstått' });
                });

                var emailPromise = new Promise((resolve, reject) => {

                    // BØR EGENTLIG HA ID OGSÅ
                    console.log("empID=" + employee.id);

                    var stringData = JSON.stringify({
                        iss: 'try.apt.opt',
                        exp: Math.floor(Date.now() / 1000) + (60 * 60), // expires in halv hour
                        id: employee.id,
                        email: employee.email,
                        type: 'vertify'
                    });

                    console.log(stringData);
                    var token = jwt.sign({
                        token: stringData
                    }, config.jwtSecret);

                    var transporter = mailer.createTransport({
                        host: 'smtp.gmail.com',
                        port: 465,
                        secure: true, // use SSL
                        auth: {
                            user: 'apttester8531@gmail.com',
                            pass: 'asdfasdfasdf'
                        }
                    });

                    var mailOptions = {
                        to: 's236313@stud.hioa.no',
                        from: 'aptemailtester1@gmail.com',
                        subject: 'APT TILBAKESTILL PASSORD',
                        html: '<a href="https://localhost:3000/confirm?token='
                        + token + '">bekreft</a>'
                    }

                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                            reject();
                        } else {
                            res.status(200).json({ message: 'En bekrefelses epost er sendt' });
                            next();
                        };
                    });
                });

                emailPromise.then(function () {
                    console.log("emailPromiseDone");
                }).catch(function (error) {
                    console.log(error);
                });
            }
        }
    }

    //metoden starter egetnlig her
    if (body.email.includes('@apt.no')) {
        fs.readFile('apt.json', handler);
    } else if (body.email.includes('@try.no')) {
        fs.readFile('try.json', handler);
    } else {
        fs.readFile('opt.json', handler)
    }
});


app.post('/resend_confirmation', function (req, res) {
    var body = _.pick(req.body, 'email');

    db_context.user.findByEmail(body).then(function (user) {
        var token = user.generateToken('email_token');

        return {
            user: user,
            token: token
        };
    }).then(function (e) {
        var transporter = mailer.createTransport(config.mailer.transport);

        var mailOptions = {
            to: 's236313@stud.hioa.no',
            from: 'aptemailtester1@gmail.com',
            subject: 'APT TILBAKESTILL PASSORD',
            html: '<a href="https://localhost:3000/confirm?token='
            + e.token + '">Tilbakestill passord</a>'
        }

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                res.status(503).json({ errors: 'En feil har oppståt' });
            } else {
                res.status(200).json({ message: 'En bekrefelses epost er sendt' });
            };
        });
    }).catch(function (e) {
        console.log(e);
        res.status(500).json({ errors: 'Ingen bruker med denne epost adressen' });
    });
});


app.get('/confirm*', mailAuthentication, function (req, res) {
    console.log('/HELLO?!?!?!');

    db_context.user.update({
        vertified: true
    }, {
            where: {
                //id: req.currentUser.id,
                email: req.currentUser.email
            },
        }
    ).then(function (result) {
        res.status(200).json({ message: 'Bruker opprettet' });
    });
});

// Get method for fetching private user data
app.post('/my_page/user_data', authentication, function (req, res) {
    var body = _.pick(req.body, 'email');
    res.status(200).json({ userData: 'melding' });
});

//
app.post("/reset_password", authentication, function (req, res) {
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
        res.status(200).json({ message: 'Passord er nå endret' });
    });
});


// Get request for navigating to password reset page 
// after clicking email link.
// Must check if reset token is still valid
app.get('/reset*', mailAuthentication, function (req, res) {

    res.sendFile(path.join(__dirname + '/../public/index.html'));
});

// Get request for creating password reset link
// the forgot url has to contain a valid unexpired token
app.post('/forgot', function (req, res) {
    var body = _.pick(req.body, 'email');

    console.log(body);

    db_context.user.findByEmail(body).then(function (user) {
        var token = user.generateToken('email_token');

        return {
            user: user,
            token: token
        };
    }).then(function (e) {
        var transporter = mailer.createTransport(config.mailer.transport);


        var mailOptions = {
            to: 's236313@stud.hioa.no',
            from: 'aptemailtester1@gmail.com',
            subject: 'APT TILBAKESTILL PASSORD',
            html: '<a href="https://localhost:3000/reset?token='
            + e.token + '">Tilbakestill passord</a>'
        }

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                res.status(503).json({ errors: 'En feil har oppståt' });
            } else {
                res.status(200).json({ message: 'En bekrefelses epost er sendt' });
            };
        });
    }).catch(function (e) {
        console.log(e);
        res.status(500).json({ errors: 'Ingen bruker med denne epost adressen' });
    });
});


app.get('/people', function (req, res) {
    res.sendFile(path.join(__dirname + '/../public/index.html'));
});


app.get('/people/*', function (req, res) {
    res.redirect('/people');
});


app.get('/my_page', function (req, res) {
    res.sendFile(path.join(__dirname + '/../public/index.html'));
});



// Get method for redirecting all traffic 
// that does not match any url.

app.get('/*', function (req, res) {
    res.redirect('/');
});


// Method for creating database
db_context.sequelize.sync({
    force: true
}).then(function (res) {

    for (var i = 0; i < TryJSON.length; i++) {
        var user = TryJSON[i];

        //console.log(user);
        db_context.user.create({
            email: user.email,
            password: 'password'
        }).then(function (result) {

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
                userId: result.id,
                linkedin: result.email,
                experience: result.email
            });
        });
    }

    db_context.user.create({
        email: 'try@try.no',
        password: 'password'
    });

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
