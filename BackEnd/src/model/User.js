"use strict";

const mongoose = require('mongoose');

const userScheama = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min:4, 
        max:256
    },
    email:  {
        type: String,
        required: true,
        min: 4, 
        max: 256
    },
    password: {
        type: String,
        required: true,
        min: 4, 
        max: 1024
    },
    mobile: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        required: true,
        min: 4, 
        max: 1024
    },
    role: {
        type: String,
        required: true,
        min:4, 
        max:20
    }
});

module.exports = mongoose.model("User", userScheama);