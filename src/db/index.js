const sequelizeModel = require('./index.sequelize')
const prismaModel = require('./index.prisma')

const Model = process.env.ORM_TYPE === 'sequelize' ? sequelizeModel
  : process.env.ORM_TYPE === 'prisma' ? prismaModel
  : {}

const DB_CONSTANTS = require('./constants')

module.exports = {
  ...Model,
  DB_CONSTANTS
}
