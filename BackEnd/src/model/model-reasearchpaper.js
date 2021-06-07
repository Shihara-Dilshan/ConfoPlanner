const mongoose = require('mongoose')

const ReseachPaperSchema =  mongoose.Schema({
    paper: {
        type: String,
        required: true
    },
    ownerRef: {
        type: String
    },
    name : {
        type: String
    }
}, {timestamps: true})

module.exports = mongoose.model("Paper", ReseachPaperSchema)
