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
                len: [0, 800]
            }
        }
    }, {
            instanceMethods: {
                toPublicJSON: function () {
                    var json = this.toJSON();
                    return _.pick(json, 'experience', 'linkedin');
                }
            }
        });
    return profile;
};



