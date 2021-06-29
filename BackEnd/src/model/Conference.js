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
    researchPapers: [{
        isApproved: {
            type: Boolean,
            required: true
        },
        startTime: {
            type: Date,
            required: false
        },
        endTime: {
            type: Date,
            required: false
        },
        paper: {
            type: mongoose.Types.ObjectId,
            required: false,
            ref: 'Paper'
        }
    }],
    workshops: [{
        isApproved: {
            type: Boolean,
            required: true
        },
        startTime: {
            type: Date,
            required: false
        },
        endTime: {
            type: Date,
            required: false
        },
        workshop: {
            type: mongoose.Types.ObjectId,
            required: false,
            ref: 'Workshop'
        }
    }]
});

const Conference = mongoose.model('Conference', conferenceSchema);
module.exports = Conference;