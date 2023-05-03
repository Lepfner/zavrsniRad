const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Route = require("../models/route");
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

router.get("/route/:id", async (req, res) => {
  try {
    const route = await Route.findOne({
      where: { id: req.params.id },
    });

    res.status(200).json(route);
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

router.post("/createNew", async (req, res) => {
    try {
      const newRoute = await Route.create({
        id: Date.now(),
        name: req.body.name,
        location: req.body.location,
        geography: req.body.geography,
        about: req.body.about,
        images: req.body.images,
        length: req.body.length,
        stars: req.body.stars,
        difficulty: req.body.difficulty,
        dateAdded: req.body.dateAdded,
      });

      res.status(201).json(newRoute);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
});

router.post("/edit", async (req, res) => {
  const route = await Route.findOne({ where: { id: req.body.id } });
  if (!route) return res.status(401).json({ message: "Route not found" });

  try {
    const newRoute = await Route.update({
      name: req.body.name,
      location: req.body.location,
      geography: req.body.geography,
      about: req.body.about,
      images: req.body.images,
      length: req.body.length,
      difficulty: req.body.difficulty,
    },
    { where: { id: req.body.id }, returning: true, plain: true }
    );

    res.status(201).json(newRoute);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/addStar", async (req, res) => {
  const route = await Route.findOne({ where: { id: req.body.id } });
  if (!route) return res.status(401).json({ message: "Route not found" });

  try {
    const newRoute = await Route.update({
      stars: req.body.newId,
    },
    { where: { id: req.body.id }, returning: true, plain: true }
    );

    res.status(201).json(newRoute);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});