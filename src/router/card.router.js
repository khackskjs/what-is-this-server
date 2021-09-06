const express = require('express')
const router = express.Router()
const db = require('../db')

router.get('/group/list', (req, res) => {
  res.send(['Card Group List'])
router.post('/group', async (req, res) => {
  const { name } = req.body
  const { uuid } = req

  const result = await db.card.createCardGroup({ name, uuid })
  res.json(result)
})
})

router.get('/list', (req, res) => {
  res.send(['Card List'])
})

module.exports = router
