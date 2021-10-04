const sequelizeModel = require('./card.sequelize')
const prismaModel = require('./card.prisma')

const model = module.exports = process.env.ORM_TYPE === 'sequelize' ? sequelizeModel
  : process.env.ORM_TYPE === 'prisma' ? prismaModel
  : {}
