const mongoose = require('mongoose')

const ReseachPaperSchema =  mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    ownerRef: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title : {
        type: String,
        required: true
    },
    thumbnail: {
        type : String
    },
    // removed dateOfConference
    status: {
        type: String,
        required: true
    },
    conferenceRef: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Conference'
    }
}, {timestamps: true})

module.exports = mongoose.model("Paper", ReseachPaperSchema)
