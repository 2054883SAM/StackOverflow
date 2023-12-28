//création des table dans la base de donné
module.exports = (sequelize, DataTypes) => {
  const Questions = sequelize.define("Questions", {
    title: {
      //Le titre est de type String
      type: DataTypes.STRING,
      //Ne peut pas etre null
      allowNull: false,
    },
    language: {
      //Le language est de type String
      type: DataTypes.STRING,
      //Ne peut pas etre null
      allowNull: false,
    },
    questionText: {
      //La question est de type String
      type: DataTypes.TEXT,
      //Ne peut pas etre null
      allowNull: false,
    },
    username: {
      //Le nom d'utilisateur est de type String
      type: DataTypes.STRING,
      //Ne peut pas etre null
      allowNull: false,
    },
  });

  //Il faut s'assurer d'écrire ce code avant de crée la table dans la base de donnée
  Questions.associate = (models) => {
    Questions.hasMany(models.Reponses, {
      //Cette ligne de code permet de dire qui si on supprime la question, tout les commentaire relie seront supprimer
      onDelete: "cascade",
    });
  };

  return Questions;
};
