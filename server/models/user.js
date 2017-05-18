var bcrypt = require('bcrypt');
var _ = require('underscore');
var crypto = require('crypto-js');
var jwt = require('jsonwebtoken');
import config from '../../config.js';

module.exports = function (sequelize, DataTypes) {
    var user = sequelize.define('user', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            forginKey: true

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
                len: [8, 30]   // sets min max length for password stored in database
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
                findByEmail: function (body) {
                    return new Promise(function (resolve, reject) {
                        if (typeof body.email !== 'string') {
                            return reject();
                        }

                        user.findOne({
                            where: { email: body.email }
                        }).then(function (user) { // resolve 
                            if (!user) {
                                return reject();
                            }
                            resolve(user);
                        }, function (e) { // reject
                            reject();
                        });
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
                            iss: 'try.apt',
                            exp: Math.floor(Date.now() / 1000) + (60 * 30), // expires in halv hour
                            id: this.get('id'),
                            email: this.get('email'),
                            type: type
                        });

                        var token = jwt.sign({
                            token: stringData
                        }, config.jwtSecret);
                        
                        return token;
                    } catch (e) {
                        return undefined;
                    }
                }
            }
        });
    return user;
};



