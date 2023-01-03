const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');
const {checkForToken, checkForUMPermission} = require('../security/auth-guard');
const {checkUsernamePathVariable, checkUserRequestBody, checkChangePasswordBody} = require('../validators/user-validator');

// GET all users
router.get('/users',
    checkForToken,
    checkForUMPermission,
    userController.getAllUsers);

// GET all usernames
router.get('/usernames',
    checkForToken,
    checkForUMPermission,
    userController.getAllUsernames);

// GET user by username
router.get('/user/:username',
    checkForToken,
    checkForUMPermission,
    checkUsernamePathVariable,
    userController.getByUsername);

// POST save user
router.post('/user',
    checkForToken,
    checkForUMPermission,
    checkUserRequestBody,
    userController.saveUser);

// POST change password
router.post('/user/change-password',
    checkForToken,
    checkForUMPermission,
    checkChangePasswordBody,
    userController.changePassword);

// POST set loggedIn ture
router.post('/user/has-logged-in',
    checkForToken,
    userController.setLoggedInTrue);

// PUT update user
router.put('/user',
    checkForToken,
    checkForUMPermission,
    checkUserRequestBody,
    userController.updateUser);

// PUT activate user
router.put('/user/activate/:username',
    checkForToken,
    checkForUMPermission,
    checkUsernamePathVariable,
    userController.activateUser);

// PUT deactivate user
router.put('/user/deactivate/:username',
    checkForToken,
    checkForUMPermission,
    checkUsernamePathVariable,
    userController.deactivateUser);

module.exports = router;