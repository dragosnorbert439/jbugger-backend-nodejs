const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Permission', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    text: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "UK_auk6ta0yl9i8ec4rpas3mspl8"
    }
  }, {
    sequelize,
    tableName: 'permissions',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "UK_auk6ta0yl9i8ec4rpas3mspl8",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "title" },
        ]
      },
    ]
  });
};
