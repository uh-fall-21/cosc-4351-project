const express = require("express");
const router = express.Router();
const { Posts, Likes, Reservations } = require("../models");

const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", validateToken, async (req, res) => {
  const listOfReservations = await Reservations.findAll({ where: { UserId: req.user.id }});
  res.json({ listOfReservations});
});

router.post("/", validateToken, async (req, res) => {
  const post = req.body;
  post.username = req.user.username;
  post.UserId = req.user.id;
  await Posts.create(post);
  res.json(post);
});

router.delete("/:postId", validateToken, async (req, res) => {
  const postId = req.params.postId;
  await Posts.destroy({
    where: {
      id: postId,
    },
  });
  res.json("DELETED SUCCESSFULLY");
});

module.exports = router;
