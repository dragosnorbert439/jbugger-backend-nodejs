const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('RolePermission', {
    permissionId: {
      type: DataTypes.BIGINT,
      field: 'permission_id',
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'permissions',
        key: 'id'
      }
    },
    roleId: {
      type: DataTypes.BIGINT,
      field: 'role_id',
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'roles',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'roles_permissions',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "permission_id" },
          { name: "role_id" },
        ]
      },
      {
        name: "FKqi9odri6c1o81vjox54eedwyh",
        using: "BTREE",
        fields: [
          { name: "role_id" },
        ]
      },
    ]
  });
};
