const express = require("express");
const router = express.Router();
const { Questions } = require("../models");

router.get("/", async (req, res) => {
  const listeQuestions = await Questions.findAll()
  res.json(listeQuestions);
});

router.post("/", async (req, res) => {
  const post = req.body;
  await Questions.create(post);
  res.json(post);
});



module.exports = router;
