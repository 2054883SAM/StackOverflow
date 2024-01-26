import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Question.css";
import { AuthContext } from "../helpers/AuthContext";

function Question() {
  let { id } = useParams();
  const [questionSelectionner, setQuestionSelectionner] = useState({});
  const [reponseQuestion, setReponseQuestion] = useState([]);
  const [nouvelleReponse, setNouvelleReponse] = useState("");
  const { authState } = useContext(AuthContext);

  //function formatDateTime(isoString) {
  //const date = new Date(isoString);
  // const formattedDate = date.toLocaleDateString();
  // const formattedTime = date.toLocaleTimeString();
  // return `${formattedTime} ${formattedDate}`;
  // }

  useEffect(() => {
    axios.get(`http://localhost:3001/questions/byId/${id}`).then((response) => {
      setQuestionSelectionner(response.data);
    });

    axios.get(`http://localhost:3001/reponses/${id}`).then((response) => {
      setReponseQuestion(response.data);
    });
  }, [id]);

  const ajouterReponse = () => {
    axios
      .post(
        "http://localhost:3001/reponses/",
        { reponsesBody: nouvelleReponse, QuestionId: id },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((reponse) => {
        if (reponse.data.error) {
          //alert(reponse.data.error);
          console.log(reponse.data.error);
        } else {
          const reponseAAjouter = {
            reponsesBody: nouvelleReponse,
            //Pour faire en sorte que lorsqu'on ajoute
            username: reponse.data.username,
            //modification faite
            id:reponse.data.id
          };
          setReponseQuestion([...reponseQuestion, reponseAAjouter]);
          setNouvelleReponse("");
        }
        /* Cette ligne de code permet d'afficher la nouvelle reponse sans avoir a rafrechire la page*/
      });
  };

  const deleteReponse = (id) => {
    console.log("ID de la réponse à supprimer:", id);
    axios.delete(`http://localhost:3001/reponses/${id}`,{
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then(()=>{
      setReponseQuestion(reponseQuestion.filter((val)=>{
        return val.id !==id;
      }))
    })
  };

  return (
    <div className="pageQuestion">
      <div className="questionDemander">
        <div className="laquestion" id="individuel">
          <div className="title">{questionSelectionner.title}</div>
          <div className="header">
            Technolgie: {questionSelectionner.language}
          </div>
          <div className="questionText">
            {questionSelectionner.questionText}
          </div>

          <div className="footer">@{questionSelectionner.username}</div>
        </div>
      </div>
      <div className="Reponse">
        <div className="ajouterReponse">
          {/*On utilise pas formik parce que nous avons pas besoin de valider une reponse a une question */}
          {/* (value) Pour pouvoir effacer le commentaire lorsqu'on a cliqué sur le boutton. Cela vas aussi premettre de clear la valeur qu'il y a dans le useState*/}
          <input
            type="text"
            placeholder="Entrez votre réponse à la question"
            autoComplete="off"
            onChange={(event) => {
              setNouvelleReponse(event.target.value);
            }}
            value={nouvelleReponse}
          ></input>
          <button onClick={ajouterReponse}>Faire part de votre réponse</button>
        </div>

        <div className="listeReponse">
          {reponseQuestion.map((reponse, key) => {
            return (
              <div key={key}>
                {reponse.reponsesBody}
                <label className="username">@{reponse.username}</label>
                {console.log(reponse.id)}
                {authState.username === reponse.username && (
                  <button
                    className="supprimer-btn"
                    onClick={() => deleteReponse(reponse.id)}
                  >
                    X
                    
                  </button>
                )}
                {/*<label className="time">{formatDateTime(question.createdAt)}</label>*/}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Question;
