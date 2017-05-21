var bcrypt = require('bcrypt');
var _ = require('underscore');
var crypto = require('crypto-js');
var jwt = require('jsonwebtoken');
import config from '../../config.js';

module.exports = function (sequelize, DataTypes) {
    var profile = sequelize.define('profile', {
        linkedin: {
            type: DataTypes.STRING,
            allowNull: true
        },
        experience: {
            type: DataTypes.STRING(800),
            validate: {
                len: [0,800]
            } 
        }
    }, {
            classMethods: {
                findByUserId: function (token) {
                    return new Promise(function (resolve, reject) {
                        // TODO
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
                    return _.pick(json, 'experience', 'linkedin');
                }
            }
        });
    return profile;
};



