const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth-controller');

router.post('/auth/login', authController.logIn);
router.post('/auth/logout', authController.logOut);

module.exports = router;