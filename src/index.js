require('./config/environment')
require('./scheduler')

const express = require('express')
const app = express()
const port = process.env.SERVER_PORT
const cors = require('cors')
const { authChecker, GoogleAuth } = require('./auth')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(authChecker)
app.use('/', (req, res, next) => {
  const param = req.method === 'POST' ? req.body : req.query
  console.log(`${req.method} ${req.url}`, param)
  next()
})

GoogleAuth.instance.initializeGoogleSetting(app)


const cardRoute = require('./router/card.router')
const userRoute = require('./router/user.router')

app.use('/card', cardRoute)
app.use('/user', userRoute)

app.listen(port, () => {
  console.log(`App started with http://localhost:${port}`)
})

// const { reviewService } = require('./service')
// reviewService.calculateReviewCards()
