const Conference = require('../model/Conference');
const ResearchPaper = require('../model/ResearchPaper');
const Workshop = require('../model/Workshop');

const addConference = async (req, res) => {
    if (req.body) {
        const newConference = new Conference(req.body);
        newConference.save().then(data => {
            res.status(200).json({ conference: data });
        }).catch(err => {
            res.status(400).json({ error: err });
        });
    }
}

const viewAllConferences = async (req, res) => {
    Conference.find().then(data => {
        res.status(200).json({ conferences: data })
        .catch(err => res.status(400).json({ err: error }));
    });
}

const viewCurrentConference = async (req, res) => {
    if (req.params.id) {
        try{
            
            const sortedPaperSchedule = await Conference.findById(req.params.id, { researchPapers: 1 })
            .sort({"researchPapers.startTime": 1})
            .populate('researchPapers.paper', 'title');  
            
            const sortedWorkshopSchedule = await Conference.findById(req.params.id, { workshops: 1 })
            .sort({"workshops.startTime": 1})
            .populate('workshops.workshop', 'title');   

            const currentConference = {
                sortedPaperSchedule,
                sortedWorkshopSchedule
            }
            
            res.status(200).json({ conference: currentConference });

        } catch(err) {
            res.status(400).json({ err });
        }

    }
}

const viewPastConferences = async (req, res) => {
    if (req.params.id) {
        try{
            let allConferences = await Conference.find();
            const pastConferences = allConferences.filter(conference => conference._id != req.params.id);
            console.log(req.params.id);
            res.status(200).json({ conferences: pastConferences });

        } catch(err) {
            res.status(400).json({ err });
        }
    }
}

const updateConferenceDates = async (req, res) => {
    if (req.body && req.params.id) {
        try{
            const { startDate, endDate } = req.body;
            const updatedConference = await Conference.findByIdAndUpdate(
                req.params.id,
                { $set: { startDate, endDate } }
            );
            res.status(200).json({ updatedConference });
        } catch(err) {
            res.status(400).json({ err });
        }
    }
}

const updateConferenceSchedule = async (req, res) => {
    if (req.body && req.params.id) {
        try {
            const { paper, workshop } = req.body;
            let updatedConference;
            if (paper) {
                let researchPaperObj = {
                    startTime: req.body.startTime,
                    endTime: req.body.endTime,
                    paper
                }
                updatedConference = await Conference.findByIdAndUpdate(
                    req.params.id,
                    { $addToSet: { researchPapers: researchPaperObj } }
                );
            }
            if (workshop) {
                let workshopObj = {
                    startTime: req.body.startTime,
                    endTime: req.body.endTime,
                    workshop
                }
                updatedConference = await Conference.findByIdAndUpdate(
                    req.params.id,
                    { $addToSet: { workshops: workshopObj } }
                );
            }
            res.status(200).json({ updatedConference });

        } catch(err) {
            res.status(400).json({ err });
        }
    }
}

module.exports = {
    addConference,
    viewCurrentConference,
    viewPastConferences,
    updateConferenceDates,
    updateConferenceSchedule,
    viewAllConferences
}