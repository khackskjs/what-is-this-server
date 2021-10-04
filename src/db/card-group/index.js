const sequelizeModel = require('./card-group.sequelize')

const model = module.exports = process.env.ORM_TYPE === 'sequelize' ? sequelizeModel
  : {}

module.exports = model
