const express = require('express')
const router = express.Router()

router.get('/group/list', (req, res) => {
  res.send(['Card Group List'])
})

router.get('/list', (req, res) => {
  res.send(['Card List'])
})

module.exports = router