var bcrypt = require('bcrypt');
var _ = require('underscore');
var crypto = require('crypto-js');
var jwt = require('jsonwebtoken');
import config from '../../config.js';

module.exports = function (sequelize, DataTypes) {
    // second paramter contains a object that represents database collums.
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
            type: DataTypes.VIRTUAL, //not created in the database, but used to manage salt and hashing before setting the data in the password_hash collum.
            allowNull: false,
            validate: {
                len: [8, 30]  //Sets min and max length for password stored in database
            },
            set: function (value) {

                var salt = bcrypt.genSaltSync(10);
                var hashedPassword = bcrypt.hashSync(value, salt);

                this.setDataValue('password', value);
                this.setDataValue('salt', salt);
                this.setDataValue('password_hash', hashedPassword);
            }
        },
        vertified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
            hooks: {
                beforeValidate: function (user, options) {

                    // forces email to lowercase.
                    if (typeof user.email === 'string') {
                        user.email = user.email.toLowerCase();
                    }
                }
            },
            classMethods: {

                // the class method that is used to authenticate a user.
                authenticate: function (body) {
                    
                    return new Promise(function (resolve, reject) {
                        if (typeof body.email !== 'string' || typeof body.password !== 'string') {
                            return reject();
                        }

                        user.findOne({
                            where: {
                                email: body.email,
                            }
                        }).then(function (user) { 
                            if (!user || !bcrypt.compareSync(body.password, user.get('password_hash'))) {
                                return reject();
                            }
                            
                            // checks if user is verified via email
                            if (user.vertified == false) {
                                reject('Bruker må bekreftes via epost');
                            }
                            resolve(user);
                        }, function (e) { 
                            reject();
                        });
                    });
                },

                // class method for finding user via email.
                findByEmail: function (body) {
                    return new Promise(function (resolve, reject) {
                        if (typeof body.email !== 'string') {
                            return reject();
                        }

                        user.findOne({
                            where: { email: body.email }
                        }).then(function (user) {  
                            if (!user) {
                                return reject();
                            }
                            resolve(user);
                        }, function (e) { 
                            reject();
                        });
                    });
                }
            },
            instanceMethods: {
                // removes sensitive information from user model.
                toPublicJSON: function () {
                    var json = this.toJSON();
                    return _.pick(json, 'id', 'email', 'createdAt', 'updatedAt');
                },
                // Genereate jwt for user.
                generateToken: function (type) {
                    if (!_.isString(type)) {
                        return undefined;
                    }
                    try {
                        var stringData = JSON.stringify({
                            iss: 'try.apt.opt',
                            exp: Math.floor(Date.now() / 1000) + (60 * 30), // expires in 30 minues
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



