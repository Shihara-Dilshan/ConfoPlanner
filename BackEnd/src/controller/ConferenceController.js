const express = require('express');
const { addConference,
    viewPastConferences,
    viewCurrentConference, 
    updateConferenceSchedule,
    viewAllConferences, updateConferenceDates } = require('../service/ConferenceService');
const router = express.Router();

router.post('/create', addConference);
router.get('/:id', viewCurrentConference);
router.get('/all-conferences', viewAllConferences);
router.get('/all-conferences/:id', viewPastConferences);
router.patch('/update-conference/:id', updateConferenceSchedule);
router.patch('/update-conference-date/:id', updateConferenceDates);

module.exports = router;
