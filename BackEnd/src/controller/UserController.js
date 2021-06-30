const express = require("express");
const router = express.Router();

const { findUserById } = require("../util/SecurityConfig");
const { getAllUsers, updateRole } = require("../service/UserService");
const viewUserNotifications = require("../service/NotificationService");

router.get("/", (req, res) => {
  res.send("sdsd");
});

router.get("/getall", async (req, res) => {
  try {
    let result = await getAllUsers();
    res.status(200).json({ result });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

router.get("/singleuser/:userId", (req, res) => {
  res.json({ result: req.profile });
});

router.param("userId", findUserById);

router.patch("/:id", updateRole);

module.exports = router;
