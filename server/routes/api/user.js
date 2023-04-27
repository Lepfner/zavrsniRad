const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const Route = require("../../models/route");
const Sequelize = require("sequelize");

router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id },
    });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/routes", async (req, res) => {
  try {
    const routes = await Route.findAll({
      attributes: [
        "id",
        "name",
        "location",
        "geography",
        "length",
        "stars",
        "difficulty",
        "dateAdded",
        "images",
        "about",
      ],
    });

    res.status(200).json(routes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/search/:query", (req, res) => {
  const query = req.params.query;
  Route.findAll({
    attributes: [
      "id",
      "name",
      "location",
      "geography",
      "length",
      "stars",
      "difficulty",
      "dateAdded",
      "images",
      "about",
    ],
    where: {
      [Sequelize.Op.or]: [
        {
          name: {
            [Sequelize.Op.iLike]: `%${query}%`,
          },
        },
        {
          surname: {
            [Sequelize.Op.iLike]: `%${query}%`,
          },
        },
      ],
    },
  })
    .then((routes) => res.status(200).json(routes))
    .catch((err) => res.status(500).json({ message: err.message }));
});

router.delete("/delete/:id", async (req, res) => {
  await Route.destroy({ where: { id: req.params.id } });
  res
    .status(200)
    .json({ message: `route ${req.params.id} was successfully deleted!` });
});
