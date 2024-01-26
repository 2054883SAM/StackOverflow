import React, { useState, useContext } from "react";
import axios from "axios";
import "./Connecter.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Connecter() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

  let navigate = useNavigate();

  const connexion = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((reponse) => {
      if (reponse.data.error) {
        alert(reponse.data.error);
      } else {
        localStorage.setItem("accessToken", reponse.data.token);
        setAuthState({username: reponse.data.username, id: reponse.data.id, statut: true});
        navigate("/");
      }
    });
  };

  return (
    <div className="container">
      <div className="connexion">
        <h2>Se connecter</h2>

        <input
          type="text"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          placeholder="(Votre nom d'utilisateur)"
        ></input>
        <input
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          placeholder="(Votre mot de passe)"
        ></input>
        <button onClick={connexion}>Se connnecter</button>
      </div>
    </div>
  );
}

export default Connecter;
