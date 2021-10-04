const Sequelize = require('sequelize')
const config = require('../config')

const sequelize = new Sequelize(config.database, config.username, config.password, config)

const db = { sequelize, Sequelize }
db.User = require('./user')(sequelize, Sequelize.DataTypes)
db.Card = require('./card')(sequelize, Sequelize.DataTypes)
db.CardGroup = require('./card-group')(sequelize, Sequelize.DataTypes)

module.exports = db;
