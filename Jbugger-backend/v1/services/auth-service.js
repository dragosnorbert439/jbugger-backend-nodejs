const jwt = require('jsonwebtoken');
const { checkPassword } = require('./password-service');
const { findByUsername } = require('./user-service');
const { ErrorCodeError, ErrorCode } = require('../custom-errors/error-code-error');

/**
 * Checks for password validity and returns a JWT in the callback
 * if credentials are correct
 * @param username {string} username of a user
 * @param password {string} password of a user
 * @param next {function} callback with error and token as params
 */
const logIn = async (username, password, next) => {

    const user = await findByUsername(username);

    // check if passwords match
    if (await checkPassword(user.password, password)) {

        // generate JWT token
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        const data = {sub: username};

        // sign token
        await jwt.sign(
            data,
            jwtSecretKey,
            { expiresIn: 86400 },
            (err, token) => {
                next(err, token);
            }
        );
    }
    // invalid credentials
    else throw new ErrorCodeError('Invalid credentials.',
        ErrorCode.INCORRECT_PASSWORD);
}

/**
 * TODO implement or delete
 */
const logOut = async () => {
    console.log("logOut called");
}

module.exports = {
    logIn,
    logOut
}