const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification-controller');
const _ = require('express-ws')(express());

router.get('/notifications/:username', notificationController.findByUsername);
router.ws('/notification', notificationController.connect);
// router.ws('/topic/notification/dummyj', (ws, req) => {
//     console.log('Topic/Notification hit.');
// });

module.exports = router;