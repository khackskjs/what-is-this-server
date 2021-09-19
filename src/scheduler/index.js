const cron = require('node-cron')

const db = require('../db')
const { reviewService } = require('../service')

const task = cron.schedule('0 0 0 * * *', async () => {
  console.log(`[scheduler] ${new Date().toString()} Calculate card Reviews`)
  await reviewService.calculateReviewCards()
})

task.start()
