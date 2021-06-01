"use strict";

const express = require('express');
const env = require('dotenv');
const DBConnection = require("./src/repository/DBConnection");

const app = express();

//enable environment varbiables file
env.config();

//app middlewares
app.use(express.json());
app.use(cors());

//create DB connection
DBConnection();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("sdsdd");
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})