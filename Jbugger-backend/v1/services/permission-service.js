const { sequelize } = require("../db/mysql/dbconnection");
const initModels = require("../models/init-models");
const models = initModels(sequelize);
const tokenService = require("./token-service");
const { Permission } = require('../models/permission');

/**
 * Returns evert permission a user has.
 * @param username {string} username of a user
 * @returns {Promise<Permission[] | null>}
 */
const findByUsername = async (username) => {
    const data =  await models.permissions.findAll({
		attributes: [ 'title', 'text' ],
        include: [{
            model: models.roles_permissions,
            as: 'roles_permissions',
			include: [{
				model: models.roles,
				as: 'role',
				include: [{
					model: models.users_roles,
					as: 'users_roles',
					include: [{
						model: models.users,
						as: 'user',
						where: [{
							user_name: username
						}],
						required: true
					}],
					required: true
				}],
				required: true
			}],
			required: true
        }],
		required: true
    });
	return data.map(it => Object({
		'title': it.dataValues['title'],
		'text': it.dataValues['text']
	}));
}

/**
 * Checks if a user has a specific permission
 * @param token {string} JsonWebToken
 * @param permissionTitle {string} title of a permission
 */
const checkPermission = async (token, permissionTitle) => {
	const username = tokenService.getCurrentUserUsername(token);
	const userPermissions = (await findByUsername(username)).map(it => it.title);
	const permission = (await findByTitle(permissionTitle)).title;

	if (userPermissions.indexOf(permission) === -1) {
		throw new Error();
	}
}

/**
 * Finds and returns a specific permission by its title
 * @param permissionTitle {string} title of a permission
 * @returns {Promise<Permission|null>} permission object
 */
const findByTitle = async (permissionTitle) => {
	return await models.permissions.findOne({ where: { title: permissionTitle }});
}

module.exports = {
    findByUsername, checkPermission
}