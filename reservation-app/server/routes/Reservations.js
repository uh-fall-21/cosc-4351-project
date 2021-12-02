const express = require("express");
const router = express.Router();
const { Reservations } = require("../models");

const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", validateToken, async (req, res) => {
  const listOfReservations = await Reservations.findAll({ where: { UserId: req.user.id }});
  res.json({ listOfReservations});
});

router.post("/", validateToken, async (req, res) => {
  const post = req.body;

  post.name = req.user.name;
  post.phone = req.user.phone;
  post.email = req.user.email;
  post.datetime = req.user.datetime;
  post.guestCount = req.user.guestCount;
  post.username = req.user.username;
  await Reservations.create(post);
  res.json(post);
});

router.delete("/:postId", validateToken, async (req, res) => {
  const postId = req.params.postId;
  await Reservations.destroy({
    where: {
      id: postId,
    },
  });
  res.json("DELETED SUCCESSFULLY");
});

module.exports = router;
