import db from '../database/db_context.js';
import jwt from 'jsonwebtoken';
import User from './../models/user'
import config from '../../config'
import crypto from 'crypto-js';

export default (req, res, next) => {
    var token = req.get('Authorization') || '';

    
    if (token) {
        jwt.verify(token, config.jwtSecret, (err, decoded) => {
            if (err) {
                res.status(401).json({ error: 'Failed to authenticate ' });
            } else {
                var stringData = JSON.parse(decoded.token);
                console.log(stringData);

                var now = Math.floor(Date.now() / 1000);
                var exp = stringData.exp;

                if (exp >= now) {
                    db.user.findOne({
                        where: {
                            id: stringData.id,
                            email: stringData.email
                        },
                        select: ['email', 'id']
                    }).then( (user) => {

                        if (!user) {
                            console.log("FINNER IKKE EN DRITT");
                            res.status(404).json({ error: 'user not found' });
                        }
                        req.currentUser = user;
                        next();
                    });
                }
                else {
                    var type = stringData.type;
                    if (type == 'email_token') {
                        res.status(401).json({error: 'Reset link expired'});
                    } else {
                        res.status(403).json({ error: 'Session Expired' });
                    } 
                }
            }
        }); // jwt.vertify end


    } else {
        res.status(401).send();
    }
}
