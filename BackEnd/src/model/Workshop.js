const mongoose = require('mongoose');

const WorkshopSchema = mongoose.Schema({
    PresenterRef: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    presentationFileURL: {
        type: String,
        required: true
    },
    estimatedDuration: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Workshop", WorkshopSchema);