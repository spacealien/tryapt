import db from '../db_context.js';
import jwt from 'jsonwebtoken';
import User from '../../models/user'
import config from '../../config'
import crypto from 'crypto-js';



export default (req, res, next) => {
    var token = req.get('Authorization') || '';
    if (token) {
        jwt.verify(token, config.jwtSecret, (err, decoded) => {
            if (err) {
                res.status(401).json({ error: 'Failed to authenticate ' });
            } else {
                var decrypted = crypto.AES
                    .decrypt(decoded.token, config.cryptoKey)
                    .toString(crypto.enc.Utf8);

                var stringData = JSON.parse(decrypted);

                db.user.findOne({
                    where: { id: stringData.id },
                    select: ['email', 'id']
                }).then(user => {
                    console.log("prøver å finne bruker");
                    console.log(user);
                    if (!user) {
                        res.status(404).json({ error: 'user not found' });
                    }
                    req.currentUser = user;
                    next();
                });
            }
        })
    }
    else {
        res.status(403).send();
    }
}

/** 
var middleware = {
    requireAuthentication: function (req, res, next) {
        var token = req.get('Authorization') || '';
        console.log("requireAuthentication");
        console.log(token);

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
*/