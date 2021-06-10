const mongoose = require('mongoose');

const WorkshopSchema = mongoose.Schema({
    PresenterRef: {
        type: String,
        required: true,
        min: 4,
        max: 256
    },
    title: {
        type: String,
        required: true,
        min: 4,
        max: 256
    },
    description : {
        type: String,
        required: true,
        min: 4,
        max: 1024
    },
    presentationFileURL: {
        type: String,
        required: true,
        min: 4,
        max: 1024
    },
    estimatedDuration: {
        type: Number,
        required: true
    }, 
    conferenceRef: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Conference'
    }
});

module.exports = mongoose.model("Workshop", WorkshopSchema);