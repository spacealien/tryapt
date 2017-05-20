import db from '../database/db_context.js';
import jwt from 'jsonwebtoken';
import User from './../models/user'
import config from '../../config'
import crypto from 'crypto-js';

export default (req, res, next) => {
    const encodedToken = req.query.token;
    console.log("encodedToken=" + encodedToken);

    if (encodedToken) {
        jwt.verify(encodedToken, config.jwtSecret, (err, decoded) => {
            if (err) {
                console.log(err);
            } else {

                var decodedToken = JSON.parse(decoded.token);
                var now = Math.floor(Date.now() / 1000)

                if (decodedToken.exp <= now) {
                    //reject();
                }

                db.user.findOne({
                    where: {
                        email: decodedToken.email
                    },
                    select: ['email', 'id']
                }).then(user => {
                    if (!user) {
                        console.log('!user');
                        
                        //reject('Invalid  link');
                    }
                    req.currentUser = user;
                    next();
                });
            }
        })
    }
}


