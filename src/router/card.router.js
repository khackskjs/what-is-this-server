const express = require('express')
const router = express.Router()
const db = require('../db')

router.post('/group', async (req, res) => {
  const { name } = req.body
  const { uuid } = req

  const result = await db.card.createCardGroup({ name, uuid })
  res.json(result)
})

router.get('/group/list', async (req, res) => {
  const { uuid } = req
  const cardList = db.card.selectCardGroupsByUuid({ uuid })
  console.log('GET /group/list cardList:', cardList)
  res.send(cardList)
})

router.post('/list', async (req, res) => {
  const { uuid } = req
  const { cardList } = req.body

  console.log('cardList', cardList)
  const result = await db.card.upsertCardList(cardList)
  console.log('POST /group/list cardList:', result)
})

router.get('/list', (req, res) => {
  res.send(['Card List'])
})

module.exports = router
