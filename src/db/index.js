const Prisma = require('@prisma/client')
const prisma = new Prisma.PrismaClient()

const Card = require('./card')

module.exports = {
  card: new Card(prisma),
}
