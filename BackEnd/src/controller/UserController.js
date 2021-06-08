const express = require('express');
const router = express.Router();

const { findUserById } = require('../util/AuthRouteController')
const { getAllUsers } = require("../service/UserService")

router.get("/", (req, res) => {
    res.send("sdsd");
});

router.get("/getall", async(req,res) => {
    try {
        let result = await getAllUsers()
        res.status(200).json({result})
    } catch (err) {
        res.status(400).json({'error': err})
    }
})

router.param('userId', findUserById)

module.exports = router;