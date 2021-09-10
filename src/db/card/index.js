const { v4: uuidv4 } = require('uuid')

class Card {
  get prisma() { return this._prisma }
  
  constructor(prisma) {
    this._prisma = prisma
  }

  async createCardGroup({ uuid, name }) {
    return await this.prisma.cardGroup.create({
      data: {
        uuid, name
      }
    }).catch(err => { console.error('err', err); return { error: 'Failed to create card group' } })
  }

  async upsertCardList(cardList) {
    const modifyCardListPromises = cardList.filter(c => !!c.cuid).map(c => this.prisma.card.update({
      where: { cuid: c.cuid },
      data: c
    }))

    const newCardListPromises = cardList.filter(c => !c.cuid).map(c => this.prisma.card.create({ data: c }))
    return await Promise.all([ ...modifyCardListPromises, ...newCardListPromises ])
  }

  selectCardGroupsByUuid({ uuid }) {
    this.prisma.cardGroup.findMany({
      where: {
        uuid
      }
    })
  }

  selectCard({ cuid }) {
    this.prisma.card.findUnique({
      where: {
        cuid
      }
    })
  }

  selectCardsByGuid({ guid }) {
    this.prisma.card.findMany({
      where: {
        guid
      }
    })
  }

  createCard({ email, guid, text1, text2 }) {
    this.prisma.card.create({
      data: {
        email, guid, text1, text2
      }
    })
  }

  // Card 의 Group 은 바꿀 수 없음
  updateCard({ cuid, text1, text2 }) {
    this.prisma.card.update({
      where: {
        cuid
      },
      data: {
        text1, text2
      }
    })
  }
}

module.exports = Card
