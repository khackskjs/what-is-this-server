const { reviewService } = require('../service')

async function applyCardReviewResult() {
  console.log(`[scheduler] ${new Date().toString()} Calculate card Reviews`)
  await reviewService.calculateReviewCards()
}

module.exports = {
  applyCardReviewResult,
}
