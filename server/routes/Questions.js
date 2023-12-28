const express = require("express");
const router = express.Router();
const { Questions } = require("../models");

router.get("/", async (req, res) => {
  const listeQuestions = await Questions.findAll();
  res.json(listeQuestions);
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  //Permet de chercher la question a l'aide de la clé primaire (id)
  const question = await Questions.findByPk(id);
  res.json(question)
});

router.post("/", async (req, res) => {
  const post = req.body;
  await Questions.create(post);
  res.json(post);
});

module.exports = router;
