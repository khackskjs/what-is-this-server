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
    return this.dbUser.update(
      { user },
      {
        where: { email: user.email },
      })
  }

  getUser({ email }) {
    return this.dbUser.findOne({
      where: { email }
    })
  }
}
