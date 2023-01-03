const tokenService = require("jsonwebtoken");

/**
 * Returns the username (subject) decoded from JWT token
 * @param token {string} JWT token
 * @returns {string} username
 */
const getCurrentUserUsername = (token) => {
    if (!token) throw new Error();

    const decodedSubject = tokenService.decode(token, process.env.JWT_SECRET_KEY).sub;
    if (!decodedSubject) throw new Error();

    return decodedSubject;
}

module.exports = {
    getCurrentUserUsername
}