function authChecker(req, res, next) {
  if (req.headers.authorization) {
  } else {
    req.uuid = 1  // temp code
    next()
    // res.status(401).json({ error: 'Unauthorized' })
  }
}

module.exports = {
  authChecker,
}
