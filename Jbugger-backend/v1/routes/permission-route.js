const express = require('express');
const router = express.Router();
const permissionController = require('../controllers/permission-controller');

router.get('/permissions/username/:username', permissionController.findByUsername);

module.exports = router;