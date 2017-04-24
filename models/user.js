var bcrypt = require('bcrypt');
var _ = require('underscore');
var crypto = require('crypto-js');
var jwt = require('jsonwebtoken');
import config from '../config.js';


module.exports = function (sequelize, DataTypes) {
    var user = sequelize.define('user', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        salt: {
            type: DataTypes.STRING
        },
        password_hash: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.VIRTUAL,
            allowNull: false,
            validate: {
                len: [7, 40]
            },
            set: function (value) {
                var salt = bcrypt.genSaltSync(10);
                var hashedPassword = bcrypt.hashSync(value, salt);

                this.setDataValue('password', value);
                this.setDataValue('salt', salt);
                this.setDataValue('password_hash', hashedPassword);
            }
        }
    }, {
            hooks: {
                beforeValidate: function (user, options) {
                    if (typeof user.email === 'string') {
                        user.email = user.email.toLowerCase();
                    }
                }
            },
            classMethods: {
                authenticate: function (body) {
                    return new Promise(function (resolve, reject) {
                        if (typeof body.email !== 'string' || typeof body.password !== 'string') {
                            return reject();
                        }

                        user.findOne({
                            where: {
                                email: body.email
                            }
                        }).then(function (user) { // resolve 
                            if (!user || !bcrypt.compareSync(body.password, user.get('password_hash'))) {
                                return reject();
                            }
                            resolve(user);
                        }, function (e) { // reject
                            reject();
                        });
                    });
                },
                findByToken: function (token) {
                    return new Promise(function (resolve, reject) {
                        try {
                            var decodedJWT = jwt.verify(token, config.jwtSecret);
                            var bytes = crypto.AES.decrypt(decodedJWT.token, config.cryptoKey);
                            var tokenData = JSON.parse(bytes.toString(crypto.enc.Utf8));

                            User.query({
                                where: { id: decoded.id },
                                select: ['email', 'id']
                            })
                                .fetch().then(function (user) {
                                    if (user) {
                                        resolve(user);
                                    } else {
                                        reject();
                                    }
                                }, function (e) {
                                    reject();
                                });
                        } catch (e) {
                            console.log(e);
                            reject();
                        }
                    });
                }
            },
            instanceMethods: {
                toPublicJSON: function () {
                    var json = this.toJSON();
                    return _.pick(json, 'id', 'email', 'createdAt', 'updatedAt');
                },
                generateToken: function (type) {
                    if (!_.isString(type)) {
                        return undefined;
                    }
                    try {
                        var stringData = JSON.stringify({
                            id: this.get('id'),
                            email: this.get('email'),
                            type: type
                        });

                        console.log(stringData);


                        var encryptedData = crypto.AES
                            .encrypt(stringData, config.cryptoKey)
                            .toString();

                            
                        console.log(encryptedData);
                        var token = jwt.sign({
                            token: encryptedData
                        }, config.jwtSecret);


                        console.log(token);


                        return token;

                    } catch (e) {
                        console.log(e);
                        return undefined;
                    }
                }
            }
        });
    return user;
};



