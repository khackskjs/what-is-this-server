const CacheService = require('./cache')
const ReviewService = require('./review')

module.exports = {
  cacheService: new CacheService(),
  reviewService: new ReviewService(),
}