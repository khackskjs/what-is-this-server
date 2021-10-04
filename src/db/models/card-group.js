module.exports = (sequelize, DataTypes) => sequelize.define('CardGroup', {
  guid: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  name: { type: DataTypes.STRING },
  uuid: { type: DataTypes.INTEGER },

  // user        User      @relation(fields: [uuid], references: [uuid])
  // cards       Card[]
}, {
  // Other model options go here
})
