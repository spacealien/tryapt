module.exports = function(db) {
    return {
        requireAuthentication: function (req, res, next) {
            var token = req.get('AUTH');

            db.user.findByToken(token).then(function(user) {

            }, function() {
                res.status(401).send();
                next();
            });

            next();
        },
        logger: function (req, res, next) {
            console.log('Request: ' + new Date().toString() + ' ' + req.method + ' ' + req.originalUrl);
            next();
        }
    };

}

