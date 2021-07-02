const express = require('express');
const { addConference,
    viewPastConferences,
    viewCurrentConference, 
    updateConferenceSchedule,
    viewAllConferences, updateConferenceDates, getSingleConfo, approveSchedule, rejectSchedule, viewCurrentConferenceForAdmin } = require('../service/ConferenceService');
const router = express.Router();

router.post('/create', addConference);
router.get('/:id', viewCurrentConference);
router.get('/all-conferences', viewAllConferences);
router.get('/get-conference/:confoId', (req,res) => {
    res.status(200).json(req.conference)
})
router.param('confoId', getSingleConfo)
router.get('/all-conferences/:id', viewPastConferences);
router.patch('/update-conference/:id', updateConferenceSchedule);
router.patch('/update-conference-date/:id', updateConferenceDates);
router.patch('/approve-schedule/:id', approveSchedule);
router.patch('/reject-schedule/:id', rejectSchedule);
router.get('/admin-view/:id', viewCurrentConferenceForAdmin);
module.exports = router;
