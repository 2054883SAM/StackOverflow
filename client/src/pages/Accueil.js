import React from 'react'
import axios from "axios";
//On veux que les requetes fonctionne des quon n'ouvre le site ou la page
import { useEffect, useState } from "react";
import "./Accueil.css"
import {useNavigate} from "react-router-dom"


function Accueil() {
    const [listeQuestions, setListeQuestions] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
      axios.get("http://localhost:3001/questions").then((response) => {
        setListeQuestions(response.data);
      });
    }, []);

    return (
      <div>
        {listeQuestions.map((valeur, key) => (
          <div className="container" key={key}> 
            <div className="question" onClick={() => navigate(`/question/${valeur.id}`)}>
              <div className="title">{valeur.title}</div>
              <div className="header">Technologie: {valeur.language.toUpperCase()}</div>
              <div className="questionText">{valeur.questionText}</div>
              <div className="footer">@{valeur.username}</div>
            </div>
          </div>
        ))}
      </div>
  );
}

export default Accueil;
