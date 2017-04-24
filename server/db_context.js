var Sequelize = require('sequelize');
var sequelize = new Sequelize('test', 'root', null, {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    logging: false,
});

sequelize.authenticate()
    .then(function (err) {
        console.log('Database connection has been established successfully.');
    }, function (err) {
        console.log('Unable to connect to database:', err);
    });

var db = {};
db.user = sequelize.import(__dirname + '/../models/user.js');
db.token = sequelize.import(__dirname + '/../models/token.js');


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;