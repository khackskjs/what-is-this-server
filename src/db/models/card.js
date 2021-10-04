module.exports = (sequelize, DataTypes) => sequelize.define('Card', {
  cuid: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  guid: { type: DataTypes.INTEGER },
  uuid: { type: DataTypes.INTEGER },
  text1: { type: DataTypes.STRING },
  text2: { type: DataTypes.STRING },
  reviewStage: { type: DataTypes.INTEGER, defaultValue: 0 },
  lastReviewResult: { type: DataTypes.INTEGER, defaultValue: 0 },
  dateOfReview: { type: DataTypes.INTEGER, allowNull: true },
  dateForNextReview: { type: DataTypes.INTEGER },
  
  // uuids             User?         @relation(fields: [uuid], references: [uuid])
  // cardGroup         CardGroup?    @relation(fields: [guid], references: [guid])
}, {
  // Other model options go here
})
