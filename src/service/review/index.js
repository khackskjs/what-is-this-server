const { DB_CONSTANTS, card: cardDbService } = require('../../db')
const { RESULT, STAGE_PERIOD, } = DB_CONSTANTS.REVIEW

function logDebuggingInfo(card) {
  return process.env.NODE_ENV !== 'local' ? {} : {
    cuid: card.cuid,
    dateOfReview: card.dateOfReview,
    lastReviewResult: { prev: card.lastReviewResult },
    reviewStage: { prev: card.reviewStage },
    dateForNextReview: { prev: card.dateForNextReview },
  }
}

module.exports = class ReviewService {
  constructor() {}

  async calculateReviewCards() {
    const cardList = await cardDbService.selectCardsByForReview()
    cardList.forEach(this._calculateNextReviewDate)
    await cardDbService.updateCardReviewResults(cardList)
  }

  _calculateNextReviewDate(card) {
    if (card.lastReviewResult !== RESULT.SUCCESS && card.lastReviewResult !== RESULT.FAILURE) {
      throw `Card[${card.cuid}] status is supposed to be 'success' or 'failure'`
    }

    // for debug
    const _card = logDebuggingInfo(card)
    
    if (card.lastReviewResult === RESULT.SUCCESS) {
      card.dateForNextReview = card.dateOfReview + STAGE_PERIOD[card.reviewStage]
      card.reviewStage++
      if (card.reviewStage >= STAGE_PERIOD.length) {
        card.reviewStage--
      }

    } else if (card.lastReviewResult === RESULT.FAILURE) {
      card.reviewStage = 0
      card.dateForNextReview = card.dateOfReview
    }
    card.lastReviewResult = RESULT.NONE

    // for debug
    Object.entries(_card).forEach(([key]) => { if (_card[key].prev != undefined) { _card[key].cur = card[key] } })
    if (process.env.NODE_ENV === 'local') {
      console.log(_card)
    }
  }
}
