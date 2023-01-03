const jwt = require("jsonwebtoken");
const permissionService = require('../services/permission-service');

/**
 * Checks if request contains Authorization header and if the token
 * is valid
 * @param req request
 * @param res response
 * @param next {function} callback
 */
const checkForToken = (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token) return res.status(403).send("Access denied.");

        jwt.verify(token, process.env.JWT_SECRET_KEY);

        next();
    } catch (error) {
        res.status(400).send("Invalid token");
    }
};

/**
 * Checks a user has a specific permission
 * @param req request - containing Authorization header with JWT token
 * @param res response
 * @param permissionTitle {string} title of a specific permission
 * @param next {function} callback
 */
const checkForPermission = async (req, res, permissionTitle, next) => {
    try {
        const token = req.header("Authorization");

        if (!token) return res.status(403).send("Access denied.");
        await permissionService.checkPermission(token, permissionTitle);

        next();
    } catch (error) {
        res.status(403).send("No permissions");
    }
}

/**
 * Checks if a user has PERMISSION_MANAGEMENT permission
 * @param req request - containing Authorization header with JWT token
 * @param res response
 * @param next {function} callback
 */
const checkForPMPermission = async (req, res, next) =>
    await checkForPermission(req, res, 'PERMISSION_MANAGEMENT', next);

/**
 * Checks if a user has USER_MANAGEMENT permission
 * @param req request - containing Authorization header with JWT token
 * @param res response
 * @param next {function} callback
 */
const checkForUMPermission = async (req, res, next) =>
    await checkForPermission(req, res, 'USER_MANAGEMENT', next);

/**
 * Checks if a user has BUG_MANAGEMENT permission
 * @param req request - containing Authorization header with JWT token
 * @param res response
 * @param next {function} callback
 */
const checkForBMPermission = async (req, res, next) =>
    await checkForPermission(req, res, 'BUG_MANAGEMENT', next);

/**
 * Checks if a user has BUG_CLOSE permission
 * @param req request - containing Authorization header with JWT token
 * @param res response
 * @param next {function} callback
 */
const checkForBCPermission = async (req, res, next) =>
    await checkForPermission(req, res, 'BUG_CLOSE', next);

/**
 * Checks if a user has BUG_EXPORT_PDF permission
 * @param req request - containing Authorization header with JWT token
 * @param res response
 * @param next {function} callback
 */
const checkForBEPDFPermission = async (req, res, next) =>
    await checkForPermission(req, res, 'BUG_EXPORT_PDF', next);

/**
 * Checks if a user has ATTACHMENT_MANAGEMENT permission
 * @param req request - containing Authorization header with JWT token
 * @param res response
 * @param next {function} callback
 */
const checkForAMPermission = async (req, res, next) =>
    await checkForPermission(req, res, 'ATTACHMENT_MANAGEMENT', next);


module.exports = {
	checkForToken,
    checkForAMPermission,
    checkForBCPermission,
    checkForPMPermission,
    checkForUMPermission,
    checkForBMPermission,
    checkForBEPDFPermission,
    checkForPermission
}