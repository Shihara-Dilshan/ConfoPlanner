const mongoose = require('mongoose');

const conferenceSchema = new mongoose.Schema({
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    researchPapers: [
        {
            type: mongoose.Types.ObjectId,
            required: false,
            ref: 'Paper'
        }
    ],
    workshops: [
        {
            type: mongoose.Types.ObjectId,
            required: false,
            ref: 'Workshop'
        }
    ]
});

const Conference = mongoose.model('Conference', conferenceSchema);
module.exports = Conference;