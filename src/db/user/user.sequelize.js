module.exports = class User {
  constructor(user) {
    this._user = user
  }

  get dbUser() { return this._user }

  createUser({ email, name } = {}) {
    return this.dbUser.create({
      email,
      name,
      studyDateCount: 1,
    })
  }

  updateUser(user) {
    const where = { email: user.email }
    return this.dbUser.update(
        { ...user },
        { where }
      ).then(async() => await this.dbUser.findOne({ where }))
  }

  getUser({ email }) {
    return this.dbUser.findOne({
      where: { email }
    })
  }
}
