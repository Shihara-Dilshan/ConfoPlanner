"use strict";

const express = require('express');
const env = require('dotenv');
const cors = require('cors');
const DBConnection = require("./src/repository/DBConnection");
const Morgan = require('morgan')

//enable environment varbiables file
env.config();

//import routes
const userRoutes = require("./src/controller/UserController");
const authRoutes = require("./src/controller/AuthController");
const paper_route = require('./src/controller/controller-researchpaper')


const app = express();

//create DB connection
DBConnection();

const PORT = process.env.PORT || 5000;

//app middlewares
app.use(express.json());
app.use(cors());
app.use(Morgan())



//route middle ware 
app.use('/api/paper', paper_route)
app.use("/api/user/", userRoutes);
app.use("/api/auth/", authRoutes);


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});