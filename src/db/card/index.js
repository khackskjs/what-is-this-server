const { v4: uuidv4 } = require('uuid')

class Card {
  get prisma() { return this._prisma }
  
  constructor(prisma) {
    this._prisma = prisma
  }

  readCard({ cuid }) {
    this.prisma.card.findUnique({
      where: {
        cuid
      }
    })
  }

  readCardByGuid({ guid }) {
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
