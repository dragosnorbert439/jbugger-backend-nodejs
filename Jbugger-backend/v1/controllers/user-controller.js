const userService = require('../services/user-service');
const tokenService = require('../services/token-service');
const {ErrorCodeError, handleError} = require("../custom-errors/error-code-error");

/**
 * Returns in response a list of users
 * @param req request
 * @param res response
 */
const getAllUsers = async (req, res) => {
    try {
        const users = await userService.findAll();
        res.json(users);
    } catch (error) {
        handleError(error, res);
    }
}

/**
 * Returns in response a list of every username
 * @param req request
 * @param res response
 */
const getAllUsernames = async (req, res) => {
    try {
        const usernames = await userService.findAllUsernames();
        res.json(usernames.map(un => un.user_name))
    } catch (error) {
        handleError(error, res);
    }
}

/**
 * Returns in response a user by its username
 * @param req request containing username
 * @param res response
 */
const getByUsername = async (req, res) => {
    try {
        const user = await userService.findByUsername(req.params.username);
        res.json(user);
    } catch (error) {
        handleError(error, res);
    }
}

/**
 * Returns a 201 CREATED response if user could be created
 * @param req request - body contains user json
 * @param res response
 */
const saveUser = async (req, res) => {
    try {
        await userService.save(req.body);
        res.status(201).send(null);
    } catch (error) {
        handleError(error, res);
    }
}

/**
 * Returns a 200 OK response if user could be updated
 * @param req request - body contains user.json
 * @param res response
 */
const updateUser = async (req, res) => {
    try {
        await userService.update(req.body);
        res.status(200).send(null);
    } catch (error) {
        handleError(error, res);
    }
}

/**
 * Returns 200 OK response if user could be activated
 * @param req request - parameters containing username
 * @param res response
 */
const activateUser = async (req, res) => {
    try {
        await userService.activateUser(req.params.username);
        res.status(200).send(null);
    } catch (error) {
        handleError(error, res);
    }
}

/**
 * Returns 200 OK response if user could be deactivated
 * @param req - request - parameters containing username
 * @param res - response
 */
const deactivateUser = async (req, res) => {
    try {
        await userService.deactivateUser(req.params.username);
        res.status(200).send(null);
    } catch (error) {
        handleError(error, res);
    }
}

/**
 * Updates a users password
 * @param req request - body containing username, old password
 * and new password
 * @param res response
 */
const changePassword = async (req, res) => {
    try {
        await userService.changePassword(
            req.body.username,
            req.body.oldPassword,
            req.body.newPassword
        );
        res.status(200).send(null);
    } catch (error) {
        handleError(error, res);
    }
}

/**
 * Sets a users has_logged_in to true
 * @param req request having Authorization header with JWT token
 * @param res response
 */
const setLoggedInTrue = async (req, res) => {
    try {
        await userService.setLoggedInTrue(
            tokenService.getCurrentUserUsername(req.header('Authorization'))
        );
        res.status(200).send(null);
    } catch (error) {
        handleError(error, res);
    }
}

module.exports = {
    getAllUsers,
    getAllUsernames,
    getByUsername,
    saveUser,
    updateUser,
    activateUser,
    deactivateUser,
    changePassword,
    setLoggedInTrue
}