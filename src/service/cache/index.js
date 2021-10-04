const cache = {}  // key: email, value: uuid

module.exports = class CacheService {
  constructor() {}

  setUser(email, user) {
    cache[email] = user
  }
  getUser(email) {
    return cache[email]
  }
  getUuidByEmail(email) {
    return (cache[email] || {}).uuid
  }
}
