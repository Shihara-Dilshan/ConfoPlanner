const express = require('express');
const { addConference,
    viewPastConferences, 
    updateConference,
    viewAllConferences } = require('../service/ConferenceService');
const router = express.Router();

router.post('/create', addConference);
router.get('/all-conferences', viewAllConferences);
router.get('/all-conferences/:id', viewPastConferences);
router.patch('/update-conference/:id', updateConference);

module.exports = router;
