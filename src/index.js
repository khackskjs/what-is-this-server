require('./config/environment')

const express = require('express')
const app = express()
const port = process.env.SERVER_PORT

const cardRoute = require('./router/card.router')

app.use('/', (req, res, next) => {
  next()
})

app.use('/card', cardRoute)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
