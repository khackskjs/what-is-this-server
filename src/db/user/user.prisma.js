module.exports = class User {
  constructor(prisma) {
    this._prisma = prisma
  }

  get prisma() { return this._prisma }

  createUser({ email, name } = {}) {
    return this.prisma.user.create({
      data: {
        email, name,
        studyDateCount: 1,
      }
    })
  }

  updateUser(user) {
    return this.prisma.user.update({
      where: { email: user.email },
      data: user,
    })
  }

  getUser({ email }) {
    return this.prisma.user.findUnique({
      where: { email }
    })
  }
}
