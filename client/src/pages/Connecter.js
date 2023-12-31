import React, { useState } from "react";
import axios from "axios";
import "./Connecter.css"

function Connecter() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const connexion = () => {
    const data={username:username, password:password}
    axios.post("http://localhost:3001/auth/login", data).then((reponse)=>{
        console.log(reponse.data)
    })
  };

  return (

    
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
  );
}

export default Connecter;
