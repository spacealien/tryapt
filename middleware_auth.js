var cryptojs = require('crypto-js');
var db = require('./db_context.js');

var middleware = {
    requireAuthentication: function (req, res, next) {
        console.log(req.get('AUTH'));
        var token = req.get('AUTH') || '';

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