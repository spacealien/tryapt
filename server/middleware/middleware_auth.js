var cryptojs = require('crypto-js');
var db = require('../db_context.js');
import jwt from 'jsonwebtoken';
import User from '../../models/user'


/** 
export default (req, res, next) => {
    var token = req.get('AUTH') || '';

    if (token) {
        jwt.verify(token, config.jwtSecret, (err, decoded) => {
            if(err) {
                res.status(401).json({ error: 'Failed to authenticate '});
            } else {
                 User.query({
                    where: {id: decoded.id },
                    select: ['email','id']
                 }).fetch().then( user => {
                    if(!user) {
                        res.status(404).json({ error: 'user not found'});
                    }   

                    req.currentUser = user;
                    next();  
                }); 
            }
        } )
    }
    else {
        res.status(403).send();
    }
}
*/

var middleware = {
    requireAuthentication: function (req, res, next) {
        var token = req.get('auth') || '';

        db.token.findOne({
            where: {
                tokenHash: cryptojs.MD5(token).toString()
            }
        }).then(function (tokenInstance) {
            if (!tokenInstance) {
                throw new Error();
            }

            req.token = tokenInstance;
            return db.user.findByToken(token);
        }).then(function (user) {
            req.user = user;
            next();
        }).catch(function () {
            res.status(401).send();
        });
    }
};
module.exports = middleware; 
