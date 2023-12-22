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
  return Questions;
};
