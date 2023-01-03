const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Attachment', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    data: {
      type: DataTypes.BLOB,
      allowNull: false
    },
    bugId: {
      type: DataTypes.BIGINT,
      field: 'bug_id',
      allowNull: false,
      references: {
        model: 'bugs',
        key: 'id'
      }
    },
    extension: {
      type: DataTypes.STRING(8),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(32),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'attachments',
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
        name: "FKs4agv21mycmr8456e48gko04s",
        using: "BTREE",
        fields: [
          { name: "bug_id" },
        ]
      }
    ]
  });
};
