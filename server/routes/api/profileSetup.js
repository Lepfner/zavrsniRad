const express = require("express");
const router = express.Router();
const User = require("../../models/user");

router.put("/setup/:id", async (req, res) => {
  try {
    const user = await User.update(
      {
        profileimg: req.body.profileimg,
        name: req.body.name,
        surname: req.body.surname,
        username: req.body.username,
        location: req.body.location,
        about: req.body.about,
      },
      { where: { id: req.params.id }, returning: true, plain: true }
    );
    res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
