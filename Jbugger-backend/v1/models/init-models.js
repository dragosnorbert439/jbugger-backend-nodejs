const DataTypes = require("sequelize").DataTypes;
const _attachments = require("./attachment");
const _bugs = require("./bug");
const _notifications = require("./notification");
const _permissions = require("./permission");
const _roles = require("./role");
const _roles_permissions = require("./role-permission");
const _users = require("./user");
const _users_roles = require("./user_role");

function initModels(sequelize) {
  const attachments = _attachments(sequelize, DataTypes);
  const bugs = _bugs(sequelize, DataTypes);
  const notifications = _notifications(sequelize, DataTypes);
  const permissions = _permissions(sequelize, DataTypes);
  const roles = _roles(sequelize, DataTypes);
  const roles_permissions = _roles_permissions(sequelize, DataTypes);
  const users = _users(sequelize, DataTypes);
  const users_roles = _users_roles(sequelize, DataTypes);

  permissions.belongsToMany(roles, { as: 'role_id_roles', through: roles_permissions, foreignKey: "permission_id", otherKey: "role_id" });
  roles.belongsToMany(permissions, { as: 'permission_id_permissions', through: roles_permissions, foreignKey: "role_id", otherKey: "permission_id" });
  roles.belongsToMany(users, { as: 'users', through: users_roles, foreignKey: "role_id", otherKey: "user_id" });
  users.belongsToMany(roles, { as: 'roles', through: users_roles, foreignKey: "user_id", otherKey: "role_id" });
  attachments.belongsTo(bugs, { as: "bug", foreignKey: "bug_id"});
  bugs.hasMany(attachments, { as: "bug_attachments", foreignKey: "bug_id"});
  roles_permissions.belongsTo(permissions, { as: "permission", foreignKey: "permission_id"});
  permissions.hasMany(roles_permissions, { as: "roles_permissions", foreignKey: "permission_id"});
  roles_permissions.belongsTo(roles, { as: "role", foreignKey: "role_id"});
  roles.hasMany(roles_permissions, { as: "roles_permissions", foreignKey: "role_id"});
  users_roles.belongsTo(roles, { as: "role", foreignKey: "role_id"});
  roles.hasMany(users_roles, { as: "users_roles", foreignKey: "role_id"});
  bugs.belongsTo(users, { as: "created_by_user", foreignKey: "created_by_user_id"});
  users.hasMany(bugs, { as: "bugs", foreignKey: "created_by_user_id"});
  bugs.belongsTo(users, { as: "assigned_to_user", foreignKey: "assigned_to_user_id"});
  users.hasMany(bugs, { as: "assigned_to_user_bugs", foreignKey: "assigned_to_user_id"});
  users.hasMany(notifications, { as: "notifications", foreignKey: "user_id"});
  users_roles.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(users_roles, { as: "users_roles", foreignKey: "user_id"});

  Promise.all([
    attachments.sync({ force: false }),
    bugs.sync({ force: false }),
    notifications.sync({ force: false }),
    permissions.sync({ force: false }),
    roles.sync({ force: false }),
    roles_permissions.sync({ force: false }),
    users.sync({ force: false }),
    users_roles.sync({ force: false })
  ]);

  return {
    attachments,
    bugs,
    notifications,
    permissions,
    roles,
    roles_permissions,
    users,
    users_roles,
  };
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
