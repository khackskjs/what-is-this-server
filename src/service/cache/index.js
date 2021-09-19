const cache = {}  // key: email, value: uuid

module.exports = class CacheService {
  constructor() {}

  setUser(email, user) {
    cache[email] = user
  }
  getUuidByEmail(email) {
    return (cache[email] || {}).uuid
  }
}
