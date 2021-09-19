const Prisma = require('@prisma/client')
const prisma = new Prisma.PrismaClient()

const DB_CONSTANTS = require('./constants')

const Card = require('./card')
const User = require('./user')

module.exports = {
  card: new Card(prisma),
  user: new User(prisma),
  DB_CONSTANTS,
}
