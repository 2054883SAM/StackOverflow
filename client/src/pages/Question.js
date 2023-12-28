import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Question.css";
function Question() {
  let { id } = useParams();
  const [questionSelectionner, setQuestionSelectionner] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3001/questions/byId/${id}`).then((response) => {
      setQuestionSelectionner(response.data);
    });
  });

  return (
    <div className="pageQuestion">
      <div className="questionDemander">
        <div className="laquestion" id="individuel">
          <div className="title">{questionSelectionner.title}</div>
          <div className="header">Technolgie: {questionSelectionner.language}</div>
          <div className="questionText">
            {questionSelectionner.questionText}
          </div>

          <div className="footer">@{questionSelectionner.username}</div>
        </div>
      </div>
      <div className="Reponse">a</div>
    </div>
  );
}

export default Question;
