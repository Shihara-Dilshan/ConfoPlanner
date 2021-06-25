const express = require('express');
const { addConference,
    viewPastConferences, 
    updateConference,
    viewAllConferences, 
    getSingleConfo} = require('../service/ConferenceService');
const router = express.Router();

router.post('/create', addConference);
router.get('/all-conferences', viewAllConferences);
router.get('/get-conference/:confoId', (req,res) => {
    res.status(200).json(req.conference)
})
router.get('/all-conferences/:id', viewPastConferences);
router.patch('/update-conference/:id', updateConference);
router.param('confoId', getSingleConfo)

module.exports = router;
