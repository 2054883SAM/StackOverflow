import "./App.css";
import axios from "axios";
//On veux que les requetes fonctionne des quon n'ouvre le site ou la page
import { useEffect, useState } from "react";

function App() {
  const [listeQuestions, setListeQuestions] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/questions").then((response) => {
      setListeQuestions(response.data);
    });
  }, []);

  return (
    <div className="App">
      {listeQuestions.map((valeur, key) => {
        return (
         <div className="container"> 
          <div className="question">
            <div className="title">{valeur.title}</div>
            <div className="header">{valeur.language}</div>
            <div className="questionText">{valeur.questionText}</div>
            <div className="footer">@{valeur.username}</div>
          </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
