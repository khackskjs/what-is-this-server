const { v4: uuidv4 } = require('uuid')

class Card {
  constructor(prisma) {
    this._prisma = prisma
  }
  
  get prisma() { return this._prisma }

  createCardGroup({ uuid, name }) {
    return this.prisma.cardGroup.create({
      data: {
        uuid, name
      }
    }).catch(err => { console.error('err', err); return { error: 'Failed to create card group' } })
  }

  updateCardGroup({ guid, name }) {
    return this.prisma.cardGroup.update({
      where: { guid },
      data: { name }
    })
  }

  deleteCardGroup({ guid }) {
    return this.prisma.cardGroup.delete({
      where: { guid },
    })
  }

  upsertCardList(cardList) {
    const modifyCardListPromises = cardList.filter(c => !!c.cuid).map(c => this.prisma.card.update({
      where: { cuid: c.cuid },
      data: c
    }))

    const newCardListPromises = cardList.filter(c => !c.cuid).map(c => this.prisma.card.create({ data: c }))
    return Promise.all([ ...modifyCardListPromises, ...newCardListPromises ])
  }

  selectCardGroupsByUuid({ uuid }) {
    return this.prisma.cardGroup.findMany({
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
    return this.prisma.card.findMany({
      where: {
        guid
      }
    })
  }
  
  selectCardsByUuidAndDateOfReview({ uuid, dateOfReview }) {
    return this.prisma.card.findMany({
      where: {
        uuid,
        dateForNextReview: {
          gte: dateOfReview
        }
      }
    })
  }

  createCard({ uuid, email, guid, text1, text2 }) {
    this.prisma.card.create({
      data: {
        uuid, email, guid, text1, text2
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
