const { sequelize } = require('../models')

const driver = async () => {
  try {
    await sequelize.sync()
  } catch (err) {
    console.error('초기화 실패')
    console.error(err)
  }
  console.log('초기화 완료')
}

driver()
