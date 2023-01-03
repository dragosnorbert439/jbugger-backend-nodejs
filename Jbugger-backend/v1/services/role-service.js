const { sequelize } = require("../db/mysql/dbconnection");
const initModels = require("../models/init-models");
const models = initModels(sequelize);
const { keysTo } = require('../helpers/utils');
const { Role } = require('../models/role');

/**
 * Returns every role in the database
 * @returns {Promise<Role[]>}
 */
const findAll = async () => {
    return await models.roles.findAll();
}

module.exports = {
    findAll
}