const Op = require('sequelize').Op

module.exports = class Card {
  constructor(card) {
    this._card = card
  }

  get dbCard() { return this._card }

  upsertCardList(cardList) {
    const modifyCardListPromises = cardList.filter(c => !!c.cuid).map(c => this.dbCard.update(
      { ...c },
      {
        where: { cuid: c.cuid },
      }))

    const newCardListPromises = cardList.filter(c => !c.cuid).map(c => this.dbCard.create({ ...c }))
    return Promise.all([ ...modifyCardListPromises, ...newCardListPromises ])
  }

  selectCard({ cuid }) {
    return this.dbCard.findOne({
      where: {
        cuid
      }
    })
  }

  selectCardsByGuid({ guid }) {
    return this.dbCard.findAll({
      where: { guid }
    })
  }
  
  selectCardsByUuidAndDateOfReview({ uuid, dateOfReview }) {
    return this.dbCard.findAll({
      where: {
        uuid,
        dateForNextReview: {
          [Op.lte]: dateOfReview
        }
      }
    })
  }

  selectCardsForReview() {
    return this.dbCard.findAll({
      where: {
        lastReviewResult: {
          [Op.not]: 0,
        }
      }
    })
  }

  createCard({ uuid, email, guid, text1, text2 }) {
    return this.dbCard.create({
      uuid, email, guid, text1, text2
    })
  }

  // Card 의 Group 은 바꿀 수 없음
  updateCard({ cuid, text1, text2 }) {
    return this.dbCard.update(
      { text1, text2 },
      {
        where: { cuid },
      })
  }

  updateCardReviewResults(cardList) {
    const promises = cardList.map(card => this.dbCard.update(
      {
        lastReviewResult: card.lastReviewResult,
        reviewStage: card.reviewStage,
        dateForNextReview: card.dateForNextReview,
      }, {
        where: { cuid: card.cuid },
      }))

    return Promise.all(promises)
  }

  /**
   *  카드 하나를 리뷰(성공/실패) 합니다.
   * 
   * @param {Object} params 
   * @returns 
   */
  reviewCard({ cuid, lastReviewResult, dateOfReview }) {
    return this.dbCard.update(
      { lastReviewResult, dateOfReview },
      {
        where: { cuid },
      })
  }
}
