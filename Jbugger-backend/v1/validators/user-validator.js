const { ErrorCodeError, ErrorCode } = require('../custom-errors/error-code-error');
const { User } = require('../models/user');

/**
 * Checks if a username (string) is present in the request path parameter.
 * @param req request with the expected username field
 * @param res response
 * @param next callback
 */
const checkUsernamePathVariable = (req, res, next) => {
    if (Object.keys(req).length
        && req.params.username
        && typeof req.params.username === "string") {
        next();
    } else {
        res.status(400).send(
            new ErrorCodeError('No username specified in request path.',
                ErrorCode.USERNAME_NOT_FOUND)
        );
    }
}

/**
 * Checks if the request's body had a user model with the following
 * fields: firstName, lastName, email, phoneNumber (camelCase)
 * @param req request with the user model in body
 * @param res response
 * @param next{function} callback
 */
const checkUserRequestBody = (req, res, next) => {
    try {
        if (Object.keys(req.body).length
            && req.body.firstName && typeof req.body.firstName === 'string'
            && req.body.lastName && typeof req.body.lastName === 'string'
            && req.body.email && typeof req.body.email === 'string'
            && req.body.phoneNumber && typeof req.body.phoneNumber === 'string'
        ) {
            validateUserModel(req.body);
            next();
        } else {
            res.status(400).send(
                new ErrorCodeError('Incorrect user model in body',
                    ErrorCode.INCORRECT_REQ_BODY)
            );
        }
    } catch (error) {
        if (error instanceof ErrorCodeError) {
            res.status(400).send(error);
        } else {
            res.status(500).send(null);
        }
    }
}

/**
 * Checks the request's body if it contains the following fields:
 * username, oldPassword, newPassword (camelCase)
 * @param req request - body containing fields as JSON
 * @param res response
 * @param next{function} callback
 */
const checkChangePasswordBody = (req, res, next) => {
    if (Object.keys(req.body).length
        && req.body.username && typeof req.body.username === 'string'
        && req.body.oldPassword && typeof req.body.oldPassword === 'string'
        && req.body.newPassword && typeof req.body.newPassword === 'string'
    ) {
        next();
    } else {
        res.status(400).send(
            new ErrorCodeError('Incorrect body for change password',
                ErrorCode.INCORRECT_REQ_BODY)
        );
    }
}

const checkUserRoles = (req, res, next) => {
    if (req.body.roles.length) {
        req.body.roles.forEach();
        next();
    } else {

    }
}

/**
 * Validates the User model given in parameter with the fields:
 * firstName, lastName, email, phoneNumber
 * @param user{User} User model
 * @throws ErrorCodeError - on invalid properties
 */
const validateUserModel = (user) => {
    if (user.firstName.length < 2 && user.lastName.length < 2)
        throw new ErrorCodeError('Names should be longer than one character',
            ErrorCode.INCORRECT_REQ_BODY_NAME);
    if (!user.email.match('.*\\b@msg.group$'))
        throw new ErrorCodeError('Incorrect e-mail address. Please provide an address like johnsmith@msg.group',
            ErrorCode.INCORRECT_REQ_BODY_EMAIL);
    if (!user.phoneNumber.match('^(49|40)?[0-9]{9}$'))
        throw new ErrorCodeError('Incorrect phone number format. Phone numbers accepted only from Germany and Romania.',
            ErrorCode.INCORRECT_REQ_BODY_PHONE);
}

module.exports = {
    checkUsernamePathVariable,
    checkUserRequestBody,
    checkChangePasswordBody,
    validateUserModel
}