import db from '../database/db_context.js';
import jwt from 'jsonwebtoken';
import User from './../models/user'
import config from '../../config'
import crypto from 'crypto-js';

export default (req, res, next) => {
    
    var urlParams;
    window.onpopstate = function () {
        var match,
            pl = /\+/g, 
            search = /([^&=]+)=?([^&]*)/g,
            decode = function (s) { return decodeURIComponent(s.replace(pl, "+")); },
            query = window.location.search.substring(1);

        urlParams = {};
        while (match = search.exec(query))
            urlParams[decode(match[1])] = decode(match[2]);
    }();

    if (urlParams.token) {
        jwt.verify(urlParams.token, config.jwtSecret, (err, decoded) => {
            if (err) {
                
            } else {
                var stringData = JSON.parse(decoded.token);

                db.user.findOne({
                    where: {
                        id: stringData.id,
                        email: stringData.email
                    },
                    select: ['email', 'id']
                }).then(user => {
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


