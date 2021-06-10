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

const updateConference = async(req, res) => {
    if (req.body && req.params.id) {
        const newConference = req.body;
        Conference.findByIdAndUpdate(req.params.id, {
            startDate: newConference.startDate,
            endDate: newConference.endDate,
            $addToSet: { researchPapers: { $each : [newConference.researchPapers]}},
            $addToSet: { workshops: { $each : [newConference.workshops]}}
        })
        .then(() => {
            res.status(200).json({ conference: newConference });
        }).catch(err => res.status(400).json({ error: err }));
    }
}

module.exports = {
    addConference,
    viewPastConferences, 
    updateConference,
    viewAllConferences
}