const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) {
    return res.json({ error: "L'utilisateur n'est pas connecté" });
  }

  try {
    //La cle secraite doit etre la meme que dans user
    
    const validToken = verify(accessToken, "secretImportant");
    //Pour prendre l'username qui provient du token
    req.user=validToken
    req.createdAt=validToken
    if (validToken) {
      return next();
    }
  } catch (error) {
    return res.json({ error: error });
  }
};

module.exports = { validateToken };
