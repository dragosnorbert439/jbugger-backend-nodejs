const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: "UK_6dotkott2kjsp8vw4d0m25fb7"
    },
    firstName: {
      type: DataTypes.STRING(30),
      field: 'first_name',
      allowNull: false
    },
    hasLoggedIn: {
      type: DataTypes.BOOLEAN,
      field: 'has_logged_in',
      allowNull: true,
      defaultValue: false
    },
    lastName: {
      type: DataTypes.STRING(30),
      field: 'last_name',
      allowNull: false
    },
    loginAttempts: {
      type: DataTypes.INTEGER,
      field: 'login_attempts',
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING(255),
      field: 'phone_number',
      allowNull: false,
      unique: "UK_9q63snka3mdh91as4io72espi"
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    userName: {
      type: DataTypes.STRING(30),
      field: 'user_name',
      allowNull: false,
      unique: "UK_k8d0f2n7n88w1a16yhua64onx"
    }
  }, {
    sequelize,
    tableName: 'users',
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
        name: "UK_6dotkott2kjsp8vw4d0m25fb7",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "UK_9q63snka3mdh91as4io72espi",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "phone_number" },
        ]
      },
      {
        name: "UK_k8d0f2n7n88w1a16yhua64onx",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_name" },
        ]
      },
    ]
  });
};
