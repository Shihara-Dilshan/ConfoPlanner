const mongoose = require('mongoose')

const ReseachPaperSchema =  mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    ownerRef: {
        type: String
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
    }
}, {timestamps: true})

module.exports = mongoose.model("Paper", ReseachPaperSchema)
