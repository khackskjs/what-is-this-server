const Prisma = require('@prisma/client')
const prisma = new Prisma.PrismaClient()

const Card = require('./card/card.prisma')
const User = require('./user/user.prisma')

module.exports = {
  card: new Card(prisma),
  user: new User(prisma),
}
