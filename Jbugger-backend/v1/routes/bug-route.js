const express = require('express');
const router = express.Router();
const bugController = require('../controllers/bug-controller');
const { checkForToken, checkForBMPermission } = require('../security/auth-guard');

router.get('/bugs', bugController.getAllBugs);
router.post('/bugs/update', bugController.updateBug);

module.exports = router;