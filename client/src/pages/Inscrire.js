import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import * as Yup from "yup";
import axios from "axios";
import {useNavigate} from "react-router-dom"

import "./Inscrire.css"




function Inscrire() {

    let navigate = useNavigate();

    const initialValues = {
        username: "",
        password: "",
      };
      
      const validationSchema = Yup.object().shape({
        username: Yup.string()
          .min(3)
          .max(15)
          .required("Veuillez entrer un nom d'utilisateur"),
        password: Yup.string()
          .min(5)
          .max(20)
          .required("Veuillez entrer votre mot de passe"),
      });
      
      const onSubmit = (data) => {
          axios.post("http://localhost:3001/auth", data).then((response) => {
              console.log(data);
                 navigate("/connexion")
            });
        };
      

  return (
    <div className="incriptionUser">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Nom d'utilisateur:</label>
          <ErrorMessage name="username" component="span" />
          <Field
             id="inputCreeQuestion"
            autocomplete="off"
            name="username"
            placeholder="(Votre nom d'utilisateur)"
          ></Field>

          <label>Mot de passe:</label>
          <ErrorMessage name="password" component="span" />
          <Field
             id="inputCreeQuestion"
             type="password"
            autocomplete="off"
            name="password"
            placeholder="(Votre mot de passe)"
          ></Field>
          <button type="submit">S'inscrire</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Inscrire;
