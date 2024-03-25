const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
const bcrypt = require("bcrypt");

//Generation du token
const { sign } = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  //L'utilisation de bcrypt.hash nous permet d'encrypter le mot de passe rentré et dans la promesse, lors de la creation
  // de l'utilisateur, on prend le username et on le met dans la base de donné. Le mot de passe du user, il vas etre encrypter
  //Parce que nous avont utiliser le mdp hash
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
    });
    res.json("Succes");
  });
});
router.post("/login", async (req, res) => {
  const { username, password, createdAt } = req.body;
  const user = await Users.findOne({ where: { username: username } });

  if (!user) {
    return res.json({ error: "L'utilisateur n'existe pas" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.json({ error: "Votre mot de passe est incorrect" });
  }
  const accessToken = sign(
    { username: user.username, id: user.id },
    "secretImportant"
  );

  res.json({token: accessToken, username: user.username, id: user.id});
});

router.get("/verificationUser", validateToken, (req, res) => {
  res.json(req.user);
});


module.exports = router;
