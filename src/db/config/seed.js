const Prisma = require('@prisma/client')
const prisma = new Prisma.PrismaClient()

async function main() {
  await prisma.user.create({
    data: {
      email: 'khackskjs@gmail.com',
      name: 'Robert',
      studyDateCount: 3,
    }
  }).catch(err => { console.error('err', err); return { error: 'Failed to create default user' } })
}

main()
