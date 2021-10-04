const path = require('path')
const dotenv = require('dotenv')

const NODE_ENV = process.env.NODE_ENV || 'live'
const PROJECT_ROOT = path.join(__dirname, '..', '..', '..')
const { parsed } = dotenv.config({
  path: path.join(PROJECT_ROOT, `.env.${NODE_ENV}`),
})

const dbConfig = {
  username: parsed.SESSION_DB_USER,
  password: parsed.SESSION_DB_PASSWORD,
  database: parsed.SESSION_DB_DATABASE,
  host: parsed.SESSION_DB_ADDRESS,
  port: parsed.SESSION_DB_PORT,
  dialect: 'mariadb',
}

module.exports = dbConfig
