const express = require('express')
const router = express.Router()
const db = require('../db')

router.post('/', async (req, res) => {
  const { email, name, } = req.body
  let user = await db.user.getUser({ email })
  if (!user) {
    user = await db.user.createUser({ email, name })
    
  } else {
    const lastLogedinTime = new Date(user.updatedAt).setHours(0, 0, 0, 0)  // ms
    const today = new Date().setHours(0, 0, 0, 0)
    if (lastLogedinTime !== today) {
      user.studyDateCount++
    }
    user = await db.user.updateUser({ email: user.email, studyDateCount: user.studyDateCount })
  }

  res.json(user)
})

module.exports = router
