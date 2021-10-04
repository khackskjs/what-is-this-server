const sequelizeModel = require('./user.sequelize')
const prismaModel = require('./user.prisma')

const model = process.env.ORM_TYPE === 'sequelize' ? sequelizeModel
  : process.env.ORM_TYPE === 'prisma' ? prismaModel
  : {}

module.exports = model
