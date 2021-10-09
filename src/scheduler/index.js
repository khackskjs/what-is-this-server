const cron = require('node-cron')
const { applyCardReviewResult } = require('./review-schedule')

const task = cron.schedule('0 0 0 * * *', applyCardReviewResult)

task.start()
console.log('[scheduler] started')
