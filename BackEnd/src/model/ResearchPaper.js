const mongoose = require('mongoose')

const ReseachPaperSchema =  mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    ownerRef: {
        type: String,
        required: true
    },
    title : {
        type: String,
        required: true
    },
    thumbnail: {
        type : String
    },
    dateOfConference: {
        type: Date
    },
    status: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model("Paper", ReseachPaperSchema)
