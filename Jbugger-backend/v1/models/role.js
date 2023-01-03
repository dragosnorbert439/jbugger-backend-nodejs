const Sequelize = require('sequelize');
const RoleTitle = require('./role-title');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Role', {
    roleId: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      field: 'id',
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: "UK_nodjpaox51kclukt7yi0hf6qf"
    },
    longTitle: {
      type: DataTypes.STRING(30),
      field: 'long_title',
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'roles',
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
        name: "UK_nodjpaox51kclukt7yi0hf6qf",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "title" },
        ]
      },
    ]
  });
};
