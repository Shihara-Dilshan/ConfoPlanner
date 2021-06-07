const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.send("sdsd");
});

module.exports = router;