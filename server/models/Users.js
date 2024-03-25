//création des table dans la base de donné
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    username: {
      //Le nom d'utilisateur est de type String
      type: DataTypes.STRING,
      //Ne peut pas etre null
      allowNull: false,
    },

    password: {
      //Le nom d'utilisateur est de type String
      type: DataTypes.STRING,
      //Ne peut pas etre null
      allowNull: false,
    },
  });

  //Il faut s'assurer d'écrire ce code avant de crée la table dans la base de donnée
  // Users.associate = (models) => {
  //  Users.hasMany(models.Questions, {
  //Cette ligne de code permet de dire qui si on supprime la question, tout les commentaire relie seront supprimer
  //  onDelete: "cascade",
  //  });
  // };

  return Users;
};
