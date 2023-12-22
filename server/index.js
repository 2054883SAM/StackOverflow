//utilisation du framework Express pour créer un serveur, écouter les requêtes entrantes sur le port 3001
const express = require("express");
const app = express();

const db = require("./models");
db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Serveur fonctionnel sur le serveur 3001");
  });
});

//création des table dans la base de donné
