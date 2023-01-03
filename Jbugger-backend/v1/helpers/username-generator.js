const {toLower} = require("lodash");

/**
 * Generate a username as follows: first 5 letters of the firstname +
 * first letter of the lastname. If there are less than 5 letters in the
 * firstname, then add more characters from the lastname.
 * @param firstName first name
 * @param lastName last name
 * @returns {string} username
 */
const generateUsername = (firstName, lastName) => {
    const init = firstName.slice(0, 5);
    const initLen = init.length;
    return toLower(init.length < 5 ? init + lastName.slice(0, 1 + 5 - initLen)
        : init + lastName.slice(0, 1));
}

module.exports = {
    generateUsername
}