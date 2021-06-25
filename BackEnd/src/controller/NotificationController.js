const { sendNotification, viewUserNotifications } = require('../service/NotificationService');
const express = require('express');
const router = express.Router();

router.post('/send-notification/', sendNotification);
router.get('/view-notifications/:id', viewUserNotifications);

module.exports = router;