const db = require('./models')

const User = require('./user')

module.exports = {
  user: new User(db.User),
}
