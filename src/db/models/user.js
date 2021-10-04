module.exports = (sequelize, DataTypes) => sequelize.define('User', {
  uuid: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  email: { type: DataTypes.STRING, unique: true }, 
  name: { type: DataTypes.STRING }, 
  studyDateCount: { type: DataTypes.INTEGER, defaultValue: 1 }
  
  // cardGroups      CardGroup[]
  // cards           Card[]
}, {
  // Other model options go here
})
