var cryptojs = require('crypto-js');

var middleware = {
    logger: function (req, res, next) {
        console.log('Request: ' + new Date().toString() + ' ' + req.method + ' ' + req.originalUrl);
        next();
    }
};
module.exports = middleware; 