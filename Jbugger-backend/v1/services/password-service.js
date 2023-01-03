const argon2 = require('argon2');

/**
 * Hashes a given password with Argon2
 * @param password {string} password to be hashed
 * @returns {Promise<string>} hashed password
 */
const hashPassword = async (password) => {
    return await argon2.hash(password, {
        hashLength: 64,
        saltLength: 32
    });
}

/**
 * Checks if passwords match (hashed-password and password)
 * @param hash {string} the hashed password
 * @param password {string} plain password
 * @returns {Promise<boolean>} true if passwords match, otherwise false
 */
const checkPassword = async (hash, password) => {
    return await argon2.verify(hash, password);
}

/**
 * Returns a 10 random character password
 * @returns {string}
 */
const generateRandomPassword = () => {
    return Math.random().toString().slice(2, 12);
}

module.exports = {
    hashPassword, checkPassword, generateRandomPassword
}