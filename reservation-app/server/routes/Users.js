const express = require("express");
const router = express.Router();
const { Users, sequelize } = require("../models");
const bcryptjs = require("bcryptjs");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");
const {uuid} = require("uuidv4");

router.get("/accinfo", validateToken, async (req, res) => {
  const userinfo = await Users.findAll({ where: { Id: req.user.id } });
  res.json(userinfo);
});

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  let newuuid = uuid().toString();
  bcryptjs.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
      preferredDinnerNum: newuuid,
    });
    res.json("SUCCESS");
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (!user) res.json({ error: "User Doesn't Exist" });

  bcryptjs.compare(password, user.password).then(async (match) => {
    if (!match) res.json({ error: "Wrong Username And Password Combination" });

    const accessToken = sign(
      { username: user.username, id: user.id },
      "importantsecret"
    );
    res.json({ token: accessToken, username: username, id: user.id });
  });
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

router.get("/basicinfo/:id", async (req, res) => {
  const id = req.params.id;

  const basicInfo = await Users.findByPk(id, {
    attributes: { exclude: ["password"] },
  });

  res.json(basicInfo);
});

router.put("/changepassword", validateToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await Users.findOne({ where: { username: req.user.username } });

  bcryptjs.compare(oldPassword, user.password).then(async (match) => {
    if (!match) res.json({ error: "Wrong Password Entered!" });

    bcryptjs.hash(newPassword, 10).then((hash) => {
      Users.update(
        { password: hash },
        { where: { username: req.user.username } }
      );
      res.json("SUCCESS");
    });
  });
});
/*
router.put("/updateaccount", validateToken, async (req, res) => {
  const {newName, newAddress, newBillingAddress, newPreferredPayMethod } = req.body;
  const user = await Users.findOne({ where: { Id: req.user.id } });
  Users.update(
    {
      name: newName,
      address: newAddress,
      billingAddress: newBillingAddress,
      preferredPayMethod: newPreferredPayMethod,
    },
    { where: { username: req.user.username} }
  );
  res.json("SUCCESS");
});
*/

router.put("/updateaccount", validateToken, async (req, res) => {
  const {newName, newAddress, newBillingAddress, newPreferredPayMethod } = req.body;
  const user = await Users.findOne({ where: { Id: req.user.id } });
  Users.update({
      name: newName,
      address: newAddress,
      billingAddress: newBillingAddress,
      preferredPayMethod: newPreferredPayMethod
    },
    { where: { username: req.user.username} }
  );
  //await Users.save();
  res.json("SUCCESS");
});



module.exports = router;
