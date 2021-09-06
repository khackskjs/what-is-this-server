require('./config/environment')

const express = require('express')
const app = express()
const port = process.env.SERVER_PORT

const { authChecker } = require('./auth')
const cardRoute = require('./router/card.router')

app.use(authChecker)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', (req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})

app.use('/card', cardRoute)

// response method
// https://expressjs.com/en/guide/routing.html

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
