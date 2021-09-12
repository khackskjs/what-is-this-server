const Prisma = require('@prisma/client')
const prisma = new Prisma.PrismaClient()

const Card = require('./card')
const User = require('./user')

module.exports = {
  card: new Card(prisma),
  user: new User(prisma),
}
