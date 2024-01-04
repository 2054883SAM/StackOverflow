const express = require("express");
const router = express.Router();
const { Reponses } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/:questionId", async (req, res) => {
  const questionId = req.params.questionId;
  //En d'autre mot, ce code veut dire: Va dans la tablea Reponse et trouve toute les reponses qui on comme id le id de la question
  const reponses = await Reponses.findAll({
    where: { QuestionId: questionId },
  });

  res.json(reponses);
});

router.post("/", validateToken, async (req, res) => {
  const reponse = req.body;
  const username = req.user.username;
 
  //Pour prendre le username du token (de la personne connecté)
  reponse.username= username;
  
  await Reponses.create(reponse);
  res.json(reponse);
});

module.exports = router;
