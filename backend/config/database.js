const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('sql12732604', 'sql12732604', 'dVpzTCHKs5', {
 host: 'sql12.freesqldatabase.com',
 dialect: 'mysql',
 port: 3306
});

module.exports = sequelize;
