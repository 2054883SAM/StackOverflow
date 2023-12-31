const express = require("express");
const router = express.Router();
const { Users } = require("../models");

const bcrypt = require("bcrypt");

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
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });
  if (!user) {
    return res.json({ error: "L'utilisateur n'existe pas" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.json({ error: "Votre mot de passe est incorrect" });
  }

  res.json("Vous êtes connecté");
});

module.exports = router;
