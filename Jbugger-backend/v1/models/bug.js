const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Bug', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    description: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    fixedInVersion: {
      type: DataTypes.STRING(24),
      field: 'fixed_in_version',
      allowNull: true
    },
    severity: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    status: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    targetDate: {
      type: DataTypes.DATEONLY,
      field: 'target_date',
      allowNull: true
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "UK_dugos8853x0nqo31eoglvr4nf"
    },
    version: {
      type: DataTypes.STRING(24),
      allowNull: false
    },
    assignedToUserId: {
      type: DataTypes.BIGINT,
      field: 'assigned_to_user_id',
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    createdByUserId: {
      type: DataTypes.BIGINT,
      field: 'created_by_user_id',
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'bugs',
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
        name: "UK_dugos8853x0nqo31eoglvr4nf",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "title" },
        ]
      },
      {
        name: "FKgwu1yha8n608f386j3mdx2vsn",
        using: "BTREE",
        fields: [
          { name: "assigned_to_user_id" },
        ]
      },
      {
        name: "FK4va1rj2dhq67xg4udf9whrrli",
        using: "BTREE",
        fields: [
          { name: "created_by_user_id" },
        ]
      },
    ]
  });
};
