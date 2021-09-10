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
  const cardGroupList = await db.card.selectCardGroupsByUuid({ uuid })
  res.json(cardGroupList)
})

router.post('/list', async (req, res) => {
  const { cardList } = req.body
  const result = await db.card.upsertCardList(cardList)
  res.json(result)
})

router.get('/list', async (req, res) => {
  const { guid } = req.query
  const cardList = await db.card.selectCardsByGuid({ guid })
  res.json(cardList)
})

module.exports = router
