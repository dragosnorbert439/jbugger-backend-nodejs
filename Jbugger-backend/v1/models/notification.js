const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Notification', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    text: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    title: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    type: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    userId: {
      type: DataTypes.BIGINT,
      field: 'user_id',
      allowNull: false,
      references: {
        mode: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'notifications',
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
    ]
  });
};