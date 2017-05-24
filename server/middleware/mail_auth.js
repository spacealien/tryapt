import db from '../database/db_context.js';
import jwt from 'jsonwebtoken';
import User from './../models/user'
import config from '../../config'
import crypto from 'crypto-js';

/**
 * Authentication middleware user for authentication 
 * reset and confirmation link with token stored as a url parameter.
 */

export default (req, res, next) => {
    const encodedToken = req.query.token;

    if (encodedToken) {
        jwt.verify(encodedToken, config.jwtSecret, (err, decoded) => {
            if (err) {
                res.status(401).json({ error: 'Failed to authenticate ' });
            } else {

                var decodedToken = JSON.parse(decoded.token);
                var now = Math.floor(Date.now() / 1000)

                // checks for token expiration,
                if (decodedToken.exp <= now) {
                    res.status(401).json({error: 'Reset link expired'});
                }

                db.user.findOne({
                    where: {
                        email: decodedToken.email
                    },
                    select: ['email', 'id']
                }).then(user => {
                    if (!user) {                        
                        res.status(401).json({error: 'Reset link expired'});
                    }
                    req.currentUser = user;
                    next();
                });
            }
        })
    }
}


