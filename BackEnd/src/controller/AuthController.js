const express = require("express");
const router = express.Router();
const { singup } = require("./../service/AuthService");

router.post("/signup", async (req, res) => {
  try {
    await singup(req.body);
    res.status(201).json({ message: "succesfully signed up" });
  } catch (err) {
    res.status(400).json({ error: "error while signup", details: err });
  }
});

module.exports = router;
