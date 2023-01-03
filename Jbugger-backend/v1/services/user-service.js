const {sequelize} = require("../db/mysql/dbconnection");
const initModels = require("../models/init-models");
const models = initModels(sequelize);
const {keysTo, renameProperty} = require('../helpers/utils');
const {generateUsername} = require("../helpers/username-generator");
const {hashPassword, checkPassword, generateRandomPassword} = require("./password-service");
const Op = require('sequelize').Op;
const {User} = require('../models/user');
const { ErrorCodeError, ErrorCode } = require('../custom-errors/error-code-error');

/**
 * @returns {Promise<User[]>} a list of users
 */
const findAll = async () => {
    return await models.users.findAll({
        include: [{
            model: models.roles,
            through: {
                model: models.users_roles,
                attributes: []
            },
            as: 'roles',
            required: false
        }]
    });
}

/**
 * @returns {Promise<string[]>} a list of usernames
 */
const findAllUsernames = async () => {
    return await models.users.findAll({attributes: ['user_name']});
}

/**
 * @param username {string} username of a user
 * @returns {Promise<User>} a user by username
 */
const findByUsername = async (username) => {
    const user = await models.users.findOne({
        where: {
            user_name: username
        }
    });
    checkUser(user, username);
    return user;
}

/**
 * Returns a user by its ID
 * @param id {number} ID of a user
 * @returns {Promise<User> | Promise<User | null>}
 */
const findById = (id) => {
    return models.users.findOne({
        where: {
            id: id
        }
    })
}

/**
 * @param user {User} model with only firstName, lastName, email and phoneNumber required
 */
const save = async (user) => {
    await sequelize.transaction(async (_transaction) => {
        const newUser = models.users.build(user);

        newUser.password = await hashPassword(generateRandomPassword());
        newUser.userName = generateUsername(newUser.firstName, newUser.lastName);
        newUser.status = true;
        newUser.token = null;
        newUser.loginAttempts = 0;
        newUser.hasLoggedIn = false;

        await newUser.save();
    });
}

/**
 * Updated a user including its roles
 * @param user{User} model with the values to be updated
 */
const update = async (user) => {
    await sequelize.transaction(async (_transaction) => {

        // check if user exists
        const userToUpdate = await models.users.findOne({where: {user_name: user.userName}});
        checkUser(userToUpdate, username);

        // check if user model came with at leas one role
        if (!user.roles || !user.roles.length)
            throw new ErrorCodeError('User must have at least one role.',
                ErrorCode.MIN_ONE_ROLE_REQUIRED);

        // update the user
        await models.users.update({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber
        }, {
            where: {user_name: user.userName}
        });

        const roleIdsToKeep = user.roles.map(it => it.roleId);

        // delete old user roles
        await models.users_roles.destroy({
            where: {
                [Op.and]: [{role_id: {[Op.notIn]: roleIdsToKeep}}, {user_id: userToUpdate.id}]
            }
        });

        // add the new assigned roles
        roleIdsToKeep.map(async id => {
            if (!(await models.users_roles
                .findOne({
                    where: {
                        user_id: userToUpdate.id,
                        role_id: id
                    }
                })))
                await models.users_roles.build({user_id: userToUpdate.id, role_id: id}).save();
        });
    });
}

/**
 * Updates a user's has_logged_in field to true
 * @param username {string} username of a specific user
 */
const setLoggedInTrue = async (username) => {
    await sequelize.transaction(async (_transaction) => {

        // check if user exists
        const userToUpdate = await models.users.findOne({where: {user_name: username}});
        checkUser(userToUpdate, username);

        // update the user's had_logged_in field to true
        await models.users.update({
            hasLoggedIn: true
        }, {
            where: {user_name: username}
        });
    });
}

/**
 * Activates a user, changes status to true so the user can log in
 * @param username {string} username of a user
 */
const activateUser = async (username) => {
    await sequelize.transaction(async (_transaction) => {

        // check if user exists
        const userToUpdate = await models.users.findOne({where: {user_name: username}});
        checkUser(userToUpdate, username);

        // update the user's status field to true
        await models.users.update({
            status: true
        }, {
            where: {user_name: username}
        });
    });
}

/**
 * Deactivates a user, changes status to false so the user can't log in
 * @param username {string} username of a user
 */
const deactivateUser = async (username) => {
    await sequelize.transaction(async (_transaction) => {

        // check if user exists
        const userToUpdate = await models.users.findOne({where: {user_name: username}});
        checkUser(userToUpdate, username);

        // update the user's status field to true
        await models.users.update({
            status: false
        }, {
            where: {user_name: username}
        });
    });
}

/**
 * Updates a user's password
 * @param username {string} username of a user
 * @param oldPassword {string} the old password in plain text
 * @param newPassword {string} the new password in plain text
 */
const changePassword = async (username, oldPassword, newPassword) => {

    // check if user exists
    const userToUpdate = await models.users.findOne({where: {user_name: username}});
    checkUser(userToUpdate, username);

    // check if old passwords match
    if (await checkPassword(userToUpdate.password, oldPassword)) {

        // if so, then update it
        await sequelize.transaction(async (_transaction) => {
            models.users.update({
                password: await hashPassword(newPassword)
            }, {
                where: {user_name: username}
            });
        });
    }
    else throw new ErrorCodeError('Passwords don\'t match.', ErrorCode.INCORRECT_PASSWORD);
}

/**
 * Checks if user object is present
 * @param user{User} user
 * @param username{string} username of the user
 */
const checkUser = (user, username) => {
    if (!user) {
        throw new ErrorCodeError('No user with username \"' + username + '\".', ErrorCode.USERNAME_NOT_FOUND);
    }
}

module.exports = {
    findAll, findAllUsernames, findByUsername, findById, save, update, setLoggedInTrue, activateUser, deactivateUser, changePassword
}