import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./CreationQuestion.css";
import * as Yup from "yup";
import axios from "axios";
import {useNavigate} from "react-router-dom"

function CreationQuestion() {
  const initialValues = {
    title: "",
    questionText: "",
    language: "",
    username: "",
  };
  let navigate = useNavigate();
  

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Veuillez entrer un titre"),
    questionText: Yup.string().required("Veuillez écrire votre question"),
    language: Yup.string().required(
      "Veuillez indiquer le language de programmation"
    ),
    username: Yup.string().min(3).max(15).required("Veuillez entrez votre nom d'utilisateur"),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/questions", data).then((response) => {
        console.log("Ca fonctionne");
           
           navigate("/")
      });
  };
  const languages = [
    "",
    "Java",
    "React",
    "Python",
    "C#",
    "C++",
    "Mysql",
    "Css",
    "JavaScript",
  ];

  

  return (
    <div className="creationQuestion">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Titre</label>
          <ErrorMessage name="title" component="span" />
          <Field
            autocomplete="off"
            id="inputCreeQuestion"
            name="title"
            placeholder="(Entrer le titre)"
          ></Field>
          <label>Question</label>
          <ErrorMessage name="questionText" component="span" />
          <Field
            autocomplete="off"
            id="inputCreeQuestion"
            name="questionText"
            placeholder="(Entrer votre question)"
          ></Field>
          <label>Technologie</label>
          <ErrorMessage name="language" component="span" />
          <Field
            as="select" // Utilisation d'une balise select pour la liste déroulante
            id="inputCreeQuestion"
            name="language"
            placeholder="(Sélectionner la technologie)"
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </Field>
          <label>Nom d'utilisateur:</label>
          <ErrorMessage name="username" component="span" />
          <Field
            autocomplete="off"
            id="inputCreeQuestion"
            name="username"
            placeholder="(Votre nom d'utilisateur)"
          ></Field>
          <button type="submit"> Poster votre question!</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreationQuestion;
