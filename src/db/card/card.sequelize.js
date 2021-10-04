module.exports = class Card {
  constructor(card) {
    this._card = card
  }

  get dbCard() { return this._card }
  
}
