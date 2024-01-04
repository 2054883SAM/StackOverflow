import React, { useState } from "react";
import axios from "axios";
import "./Connecter.css";
import { useNavigate } from "react-router-dom";

function Connecter() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  const connexion = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((reponse) => {
      if (reponse.data.error) {
        alert(reponse.data.error);
      } else {
        sessionStorage.setItem("accessToken", reponse.data);
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
