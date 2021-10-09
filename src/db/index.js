const DB_CONSTANTS = require('./constants')
const Model = process.env.ORM_TYPE === 'sequelize' ? require('./index.sequelize')
  : process.env.ORM_TYPE === 'prisma' ? require('./index.prisma')
  : {}

module.exports = {
  ...Model,
  DB_CONSTANTS
}
