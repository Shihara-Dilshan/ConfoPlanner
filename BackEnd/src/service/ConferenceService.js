const { findByIdAndUpdate } = require('../model/Conference');
const Conference = require('../model/Conference');

const addConference = async(req, res) => {
    if (req.body) {
        const newConference = new Conference(req.body);
        newConference.save().then(data => {
            res.status(200).json({ conference: data });
        }).catch(err => {
            res.status(400).json({ error: err });
        });
    }
}

const viewAllConferences = async(req, res) => {
    Conference.find().then(data => {
        res.status(200).json({ conferences: data })
        .catch(err => res.status(400).json({ err: error }));
    });
}

const viewPastConferences = async(req, res) => {
    if (req.params.id) {
        let allConferences = await Conference.find();
        const pastConferences = allConferences.filter(conference => conference._id != req.params.id);
        console.log(req.params.id);
        res.status(200).json({ conferences: pastConferences });
    }
}

const updateConferenceDates = async (req, res) => {
    if (req.body && req.params.id) {
        const { startDate, endDate } = req.body;
        const updatedConference = await Conference.findByIdAndUpdate(
            req.params.id,
            { $set: { startDate, endDate } }
        );
        res.status(200).json({ updatedConference });
    }
}

const updateConferenceSchedule = async(req, res) => {
    if (req.body && req.params.id) {
        const { researchPaper, workshop } = req.body;
        let updatedConference;
        if (researchPaper) {
            updatedConference = await Conference.findByIdAndUpdate(
                req.params.id,
                { $addToSet: { researchPapers: researchPaper } }
            );
        }
        if (workshop) {
            updatedConference = await Conference.findByIdAndUpdate(
                req.params.id,
                { $addToSet: { workshops: workshop } }
            );
        }
        res.status(200).json({ updatedConference });
    }
}

module.exports = {
    addConference,
    viewPastConferences,
    updateConferenceDates,
    updateConferenceSchedule,
    viewAllConferences
}