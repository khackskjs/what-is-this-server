const db = require('./models')

const User = require('./user')
const Card = require('./card')
const CardGroup = require('./card-group')

module.exports = {
  user: new User(db.User),
  card: new Card(db.Card),
  cardGroup: new CardGroup(db.CardGroup),
}
