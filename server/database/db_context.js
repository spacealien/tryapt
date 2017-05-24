import Sequelize from 'sequelize';
import config from '../../config.js';
import User from '../models/user';
import Profile from '../models/profile';

var sequelize = new Sequelize('test', 'root', null, {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    logging: false
});

// checks if database connection is successfully established
sequelize.authenticate().then(function (err) {
    console.log('Database connection has been established successfully.');
}, function (err) {
    console.log('Unable to connect to database:', err);
});

// define tables with doman models.
var db = {};
db.user = sequelize.import(__dirname + '/../models/user.js');
db.profile = sequelize.import(__dirname + '/../models/profile.js');


// define table relations
db.user.hasOne(db.profile);
db.profile.belongsTo(db.user);


db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;