//création des table dans la base de donné
module.exports = (sequelize, DataTypes) => {
    const Reponses = sequelize.define("Reponses", {
   
      reponsesBody: {
          //La reponse est de type String
          type: DataTypes.STRING,
          //Ne peut pas etre null
          allowNull: false,
        },

        username: {
          //La username est de type String
          type: DataTypes.STRING,
          //Ne peut pas etre null
          allowNull: false,
        },
    });
    return Reponses;
  };
  