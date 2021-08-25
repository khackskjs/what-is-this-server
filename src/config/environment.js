const path = require('path')
const env = process.env.NODE_ENV || 'production'
const filename = env === 'production' ? '.env' : `.env.${env}`

require('dotenv').config({
  path: path.resolve(process.cwd(), filename)
})
