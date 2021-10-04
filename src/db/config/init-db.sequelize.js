const mysql = require('mysql2/promise');
const config = require('../config')
const { host, port, username: user, password, database: dbName } = config
let connection
async function initializeDb() {
  connection = await mysql.createConnection({ host, port, user, password })
  return connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName};`)
}

initializeDb()
  .then(result => {
    console.log(`SUCCESS TO CREATE DB[${dbName}]`, result)
  }).catch(error => {
    console.error(`FAILED TO CREATE DB[${dbName}]`)
  }).finally(() => {
    connection.end()
  })
