//utilisation du framework Express pour créer un serveur, écouter les requêtes entrantes sur le port 3001
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
const db = require("./models");

//Routes
const routeQuestion = require("./routes/Questions");
app.use("/questions", routeQuestion);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Serveur fonctionnel sur le serveur 3001");
  });
});
