module.exports = class CardGroup {
  constructor(cardGroup) {
    this._cardGroup = cardGroup
  }

  get dbCardGroup() { return this._cardGroup }

  createCardGroup({ uuid, name }) {
    return this.dbCardGroup.create({
      uuid, name
    }).catch(err => { console.error('err', err); return { error: 'Failed to create card group' } })
  }

  updateCardGroup({ guid, name }) {
    return this.dbCardGroup.update(
      { name },
      {
        where: { guid },
      })
  }

  deleteCardGroup({ guid }) {
    return this.dbCardGroup.destroy({
      where: { guid },
    })
  }

  selectCardGroupsByUuid({ uuid, guidList }) {
    const where = { uuid }
    if (guidList) {
      where['guid'] = { in: guidList }
    }

    return this.dbCardGroup.findAll({ 
      where
    })
  }
}
