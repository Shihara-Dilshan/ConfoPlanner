const express = require("express");
const router = express.Router();
const { singup, login } = require("./../service/AuthService");

router.post("/signup", async (req, res) => {
  if(req.body.role === 'admin') {
    res.status(400).json({error: 'error while signup'})
  }else {
    try {
      await singup(req.body);
      res.status(200).json({ message: "succesfully signed up" });
    } catch (err) {
      res.status(400).json({ error: "error while signup", details: err });
    }
  }
});

router.post("/login", async (req, res) => {
  try {
    const result = await login(req.body);
    res.status(200).json({ token: result });
  } catch (err) {
    res.status(400).json({ error: "error while login", details: err });
  }
});

module.exports = router;
