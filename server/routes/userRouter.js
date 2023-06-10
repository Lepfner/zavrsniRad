const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Route = require("../models/route");
const Starred = require("../models/starred");
const Images = require("../models/image");
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

router.get("/image/:id", async (req, res) => {
  try {
    const images = await Images.findAll({
      attributes: ["image"],
      where: { route_id: req.params.id },
    });
    res.status(200).json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/imageOne/:id", async (req, res) => {
  try {
    const images = await Images.findOne({
      attributes: ["image"],
      where: { route_id: req.params.id },
    });
    res.status(200).json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/userRoutes/:user_id", async (req, res) => {
  try {
    const route = await Route.findAll({
      where: { user_id: req.params.user_id },
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
        "lng",
        "lat",
        "endLng",
        "endLat",
        "stars",
        "difficulty",
        "dateAdded",
        "about",
        "user_id",
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
      "lng",
      "lat",
      "endLng",
      "endLat",
      "stars",
      "difficulty",
      "dateAdded",
      "about",
      "user_id",
    ],
    where: {
      [Sequelize.Op.or]: [
        {
          name: {
            [Sequelize.Op.iLike]: `%${query}%`,
          },
        },
        {
          location: {
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
  await Images.destroy({ where: { route_id: req.params.id } });
  res
    .status(200)
    .json({ message: `route ${req.params.id} was successfully deleted!` });
});

router.post("/createNew", async (req, res) => {
  try {
    const newRoute = await Route.create({
      id: Date.now() + 1000,
      name: req.body.name,
      location: req.body.location,
      lng: req.body.lng,
      lat: req.body.lat,
      endLng: req.body.endLng,
      endLat: req.body.endLat,
      about: req.body.about,
      stars: 0,
      difficulty: req.body.difficulty,
      user_id: req.body.user_id,
      dateAdded: Date.now(),
    });
    for (let i = 0; i < req.body.lengthImg; i++) {
      try {
        const insertImage = await Images.create({
          id: Date.now() + 1000,
          route_id: newRoute.id,
          image: req.body.images[i].data_url,
        });
      } catch (error) {
        console.log(error);
      }
    }
    res.status(201).json(newRoute);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/edit", async (req, res) => {
  const route = await Route.findOne({ where: { id: req.body.id } });
  if (!route) return res.status(401).json({ message: "Route not found" });
  try {
    const newRoute = await Route.update(
      {
        name: req.body.name,
        location: req.body.location,
        lng: req.body.lng,
        lat: req.body.lat,
        endLng: req.body.endLng,
        endLat: req.body.endLat,
        about: req.body.about,
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
  const firstCheck = await Starred.findOne({
    where: { user_id: req.body.user_id, route_id: req.body.route_id },
  });
  if (firstCheck)
    return res.status(401).json({ message: "You already starred this route!" });
  try {
    const starredRoute = await Starred.create({
      id: Date.now() + 1000,
      user_id: req.body.user_id,
      route_id: req.body.route_id,
    });
    const changedRoute = await Route.update(
      {
        stars: Sequelize.literal("stars + 1"),
      },
      { where: { id: req.body.route_id }, returning: true, plain: true }
    );
    res.status(201).json(changedRoute);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/removeStar", async (req, res) => {
  const firstCheck = await Starred.findOne({
    where: { user_id: req.body.user_id, route_id: req.body.route_id },
  });
  if (!firstCheck)
    return res.status(401).json({ message: "You haven't starred this route!" });
  try {
    await Starred.destroy({
      where: { user_id: req.body.user_id, route_id: req.body.route_id },
    });
    const changedRoute = await Route.update(
      {
        stars: Sequelize.literal("stars - 1"),
      },
      { where: { id: req.body.route_id }, returning: true, plain: true }
    );
    res.status(201).json(changedRoute);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/favRoutes", async (req, res) => {
  try {
    const routes = await Starred.findAll({
      attributes: ["route_id"],
      where: {
        user_id: req.body.user_id,
      },
    });
    res.status(200).json(routes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/getFavRoutes", async (req, res) => {
  try {
    const routes = await Route.findAll({
      attributes: [
        "id",
        "name",
        "location",
        "lng",
        "lat",
        "endLng",
        "endLat",
        "stars",
        "difficulty",
        "dateAdded",
        "about",
        "user_id",
      ],
      where: {
        id: { [Sequelize.Op.in]: req.body.itemIds },
      },
    });

    res.json(routes);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
