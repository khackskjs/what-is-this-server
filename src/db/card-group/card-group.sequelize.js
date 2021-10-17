const Op = require('sequelize').Op

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
    const where = { guid }
    return this.dbCardGroup.update(
        { name },
        { where }
      ).then(async() => await this.dbCardGroup.findOne({ where }))
  }

  deleteCardGroup({ guid }) {
    return this.dbCardGroup.destroy({
      where: { guid },
    })
  }

  selectCardGroupsByUuid({ uuid, guidList }) {
    const where = { uuid }
    if (guidList) {
      where['guid'] = { [Op.in]: guidList }
    }

    return this.dbCardGroup.findAll({ 
      where
    })
  }
}
