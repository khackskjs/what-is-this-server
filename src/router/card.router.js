const express = require('express')
const router = express.Router()
const db = require('../db')

router.post('/group', async (req, res) => {
  const { name, guid } = req.body
  const { uuid } = req.user

  const result = guid
    ? await db.card.updateCardGroup({ guid, name })
    : await db.card.createCardGroup({ name, uuid })

  res.json(result)
})

router.delete('/group', async (req, res) => {
  const { guid } = req.body
  const { uuid } = req.user

  const result = await db.card.deleteCardGroup({ guid })
  res.json(result)
})

router.get('/group/list', async (req, res) => {
  const { uuid } = req.user
  const { guidList } = req.query

  if (!Array.isArray(guidList)) {
    return res.status(400).end()
  }

  const cardGroupList = await db.card.selectCardGroupsByUuid({ uuid, guidList: guidList.map(g => +g) })
  res.json(cardGroupList)
})

router.post('/list', async (req, res) => {
  const { cardList } = req.body
  const { uuid } = req.user
  cardList.forEach(card => card.uuid = uuid)
  
  const result = await db.card.upsertCardList(cardList)
  res.json(result)
})

router.get('/list', async (req, res) => {
  let { guid } = req.query
  guid = +guid
  const cardList = await db.card.selectCardsByGuid({ guid })
  res.json(cardList)
})

router.post('/review', async (req, res) => {
  const card = await db.card.reviewCard(req.body)
  res.json(card)
})

router.get('/review/list', async (req, res) => {
  let { dateOfReview } = req.query
  const { uuid } = req.user
  dateOfReview = +dateOfReview

  const cardList = await db.card.selectCardsByUuidAndDateOfReview({ uuid, dateOfReview })
  console.log(`cardList[${cardList.length}]`)
  res.json(cardList)
})

module.exports = router
