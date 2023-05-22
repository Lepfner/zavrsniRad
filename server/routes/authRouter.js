const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

var randomNumber;

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) return res.status(401).json({ message: "User not found" });
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.dataValues.password
    );
    if (!validPassword){
      return res.status(401).json({ message: "Authentication failed" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.send(error);
  }
});

router.post("/register", async (req, res) => {
  const emailTaken = await User.findOne({ where: { email: req.body.email } });
  if (emailTaken) {
    return res.status(500).json({ message: "Email already in use" });
  } else {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const newUser = await User.create({
        id: Date.now(),
        email: req.body.email,
        password: hashedPassword,
      });
      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
});

router.post("/code", async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) return res.status(401).json({ message: "User not found!" });
    randomNumber = Math.floor(Math.random() * 90000) + 10000;
    return res.status(200).json(randomNumber);
  } catch (error) {
    res.send(error);
  }
});

router.post("/verify", async (req, res) => {
  try {
    if (req.body.authCode == randomNumber) {
      return res.status(200).json({ message: "Verification successful! " });
    } else {
      return res.status(401).json({ message: "Verification failed!" });
    }
  } catch (error) {
    res.send(error);
  }
});

router.post("/changepass", async (req, res) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  if (!user) return res.status(401).json({ message: "User not found" });
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = await User.update(
      {
        password: hashedPassword,
      },
      { where: { email: req.body.email }, returning: true, plain: true }
    );
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
