import authentication from './middleware/auth';
import mailAuthentication from './middleware/mail_auth';
import _ from 'underscore';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';
import validateLogin from './shared/validation/login_validation';
import mailer from 'nodemailer';
import request from 'request';
import db_context from './database/db_context';
import jwt from 'jsonwebtoken';
import config from '../config';



export default function (app) {

    // Login POST request 
    app.post('/my_page/login', function (req, res) {
        var body = _.pick(req.body, 'email', 'password');
        const { errors, isValid } = validateLogin(body);

        if (!isValid) {
            res.status(400).json({
                error: {
                    message: 'Ikke gyldig brukernavn/passord'
                }
            });
        }

        var userInstance;
        // Uses class method in user model for authenticate user.
        db_context.user.authenticate(body).then(function (user) {
            var token = user.generateToken('authentication');
            userInstance = user;
            return token;

        }).then(function (token) {
            res.json({ token });
        }).catch(function (e) {
            // returns 401 unauthorized if user not found in database.
            res.status(401).json({
                error: {
                    message: 'Ingen bruker med gitt e-post/passord'
                }
            });
        });
    });


    // GET method for fetching employees from JSON file 
    app.get('/api/people', function (req, res) {
        var body = _.pick(req.body, 'email');

        //the handler variable is a ASNYC file handler for fs.ReadFile() method. 
        var employees = {};
        var count = 0;
        var handler = function (error, content) {
            count++;

            if (error) {
                //sends generic 500 error status if an error occurs.
                res.status(500).send();
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

            // Statement is true when all three files are read.
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
    app.post('/api/people/employee', function (req, res) {
        var body = _.pick(req.body, 'email');

        //the handler variable is a ASNYC file handler for fs.ReadFile() method. 
        var list;
        var employee;
        var count = 0;
        var handler = function (error, content) {
            count++;

            if (error) {
                //sends generic 500 error status if an error occurs.
                console.log(error);
                res.status(500).send();
            }
            else {

                // parses content of file buffer to JSON format.
                var jsonData = JSON.parse(content);
                list = jsonData;
            }

            // if statment is true when one file is read.
            if (count == 1) {

                // Searches JSON for matching employee
                list.map(function (emp) {
                    console.log(emp);
                    console.log(body.email);
                    if (emp.email.toLowerCase() === body.email) {
                        employee = emp;
                    }
                }); // end map

                if (employee) {
                    // returns the found employee
                    res.status(200).json({ employee: employee });
                } else {
                    console.log(employee);
                    res.status(500).send();
                }

            }
        } // end handler

        //metoden starter egetnlig her
        if (body.email.includes('@apt.no')) {
            fs.readFile('apt.json', handler);
        } else if (body.email.includes('@try.no')) {
            fs.readFile('try.json', handler);
        } else {
            fs.readFile('opt.json', handler)
        }
    });


    // Finds public profile, including experience and linkedin url.
    app.post('/api/people/profile', function (req, res) {
        var body = _.pick(req.body, 'email');

        // Searches for profile in database. 
        db_context.user.findOne({
            where: {
                email: body.email.toLowerCase()
            }
        }).then(function (user) {
            if (user) {
                // fetches profile with matching userId(foreign key) 
                user.getProfile({
                    where: {
                        userId: user.id
                    }
                }).then(function (profile) {
                    //returns profile if successful
                    res.status(200).json({ profile: profile })
                });
            } else {
                res.status(500).json({ message: 'bruker med epost ekisterer ikke' });
            }
        }).catch(function (error) {
            res.status(500).send();
        });
    });


    // Updates user profile, including experience and linkedin url.
    app.post('/my_page/profile/update', authentication, function (req, res) {
        var body = _.pick(req.body, 'user', 'profile');
        var attributes = {};


        if (body.profile.linkedin.length >= 0) {
            attributes.linkedin = body.profile.linkedin;
        }

        if (body.profile.experience.length >= 0) {
            attributes.experience = body.profile.experience;
        }

        // Searches for profile in database. 
        db_context.profile.findOne({
            where: {
                userId: req.currentUser.id
            }
        }).then(function (profile) {
            if (profile) {

                profile.update(attributes).then(
                    // updates profile if right profile is found.
                    function (profile) {
                        res.json(profile.toJSON());
                    },
                    function (error) {
                        res.status(400).json({ error: 'En feil har oppstått' });
                    },
                    function () {
                        res.status(500).json().send();
                    }
                );
            }
        });
    }); //end /my_page/update


    // POST method for creating a new user for a employee.
    app.post('/api/user/register', function (req, res) {
        var body = _.pick(req.body, 'email', 'password');

        var list = {};
        var count = 0;
        var isEmployee = false;

        // handler for registering a employee
        var handler = function (error, content) {
            count++;

            if (error) {
                console.log(error);
                res.status(500).send();
            }
            else {
                var jsonData = JSON.parse(content);
                list = jsonData;
            }

            if (count == 1) {
                var employee = {}

                // Searching for employee in JSON files.
                list.map(function (emp) {
                    if (emp.email.toLowerCase() === body.email.toLowerCase()) {
                        isEmployee = true;
                        employee.email = emp.email;
                    }
                }); // end map

                // Statement is true if employee is found in employee JSON files. 
                if (isEmployee) {

                    // Creates user and profile in database.
                    db_context.user.create({
                        email: body.email,
                        password: body.password,
                    }).then(function (result) {
                        db_context.profile.create({
                            userId: result.id,
                            linkedin: '',
                            experience: '',
                        });
                    }).catch(function (e) {
                        // Exception thrown when user already exist in database.
                        res.status(500).json({ errors: 'Denne brukeren ekisterer allerede' });
                    });

                    // Creating promise for sending vertifying email
                    var emailPromise = new Promise((resolve, reject) => {


                        // Create token content.
                        var stringData = JSON.stringify({
                            iss: 'try.apt.opt',
                            exp: Math.floor(Date.now() / 1000) + (60 * 60), // expires in halv hour
                            id: employee.id,
                            email: employee.email,
                            type: 'vertify'
                        });

                        // Sign the token.
                        var token = jwt.sign({
                            token: stringData
                        }, config.jwtSecret);


                        var transporter = mailer.createTransport({
                            host: 'smtp.gmail.com',
                            port: 465,
                            secure: true,
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
                                res.status(500).send();
                                reject();
                            } else {
                                res.status(200).json({ message: 'En bekrefelses epost er sendt' });
                                next();
                            };
                        });
                    }); // end emailPromise

                    emailPromise.then(function () {

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


    // Get request for creating password reset link
    // the forgot url has to contain a valid unexpired token
    app.post('/api/user/forgot', function (req, res) {
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
                html: '<p>Følg linken nedenfor for å tilbakestille passordet ditt: </p><a href="https://localhost:3000/reset?token='
                + e.token + '">Tilbakestill passord</a>'
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    res.status(503).json({ errors: 'En feil har oppstått' });
                } else {
                    res.status(200).json({ message: 'En e-post er sendt til deg, med en link til å endre passordet ditt' });
                };
            });
        }).catch(function (e) {
            res.status(500).json({ errors: 'Ingen bruker med denne e-postadressen' });
        });
    });

    //POST method for requsting a new confirmation email when creating a new user.
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
                to: e.user.email.toLowerCase(),
                from: 'aptemailtester1@gmail.com',
                subject: 'APT TILBAKESTILL PASSORD',
                html: '<a href="https://localhost:3000/confirm?token='
                + e.token + '">Tilbakestill passord</a>'
            }

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    res.status(503).json({ errors: 'En feil har oppstått' });
                } else {
                    res.status(200).json({ message: 'En e-post er sendt til deg' });
                };
            });
        }).catch(function (e) {
            res.status(500).json({ errors: 'Ingen bruker med denne e-postadressen' });
        });
    });

    // GET method for validating email link after user has
    // clicked confimation link.
    app.get('/confirm*', mailAuthentication, function (req, res) {

        db_context.user.update({
            vertified: true
        }, {
                where: {
                    //id: req.currentUser.id,
                    email: req.currentUser.email
                }
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


    // POST method for reseting user password.
    // Authentication is required for this route.
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
            res.status(200).json({ message: 'Passordet er nå endret' });
        }).catch(function (error) {
            res.status(500).send();
        });
    });

    // GET request for navigating to password reset page after clicking email link.
    app.get('/reset*', mailAuthentication, function (req, res) {
        res.sendFile(path.join(__dirname + '/../public/index.html'));
    });


    // The following GET methods is used to make the diffrent URLs
    // available from the client.
    app.get('/people', function (req, res) {
        res.sendFile(path.join(__dirname + '/../public/index.html'));
    });


    app.get('/people/*', function (req, res) {
        res.redirect('/people');
    });


    app.get('/my_page', function (req, res) {
        res.sendFile(path.join(__dirname + '/../public/index.html'));
    });


    app.get('/my_page/login', function (req, res) {
        res.sendFile(path.join(__dirname + '/../public/index.html'));
    });


    app.get('/info', function (req, res) {
        res.sendFile(path.join(__dirname + '/../public/index.html'));
    });

    app.get('/newuser', function (req, res) {
        res.sendFile(path.join(__dirname + '/../public/index.html'));
    });

    app.get('/forgot', function (req, res) {
        res.sendFile(path.join(__dirname + '/../public/index.html'));
    });

    // Get method for redirecting all traffic, that does not match any url.
    app.get('/*', function (req, res) {
        res.redirect('/');
    });
}