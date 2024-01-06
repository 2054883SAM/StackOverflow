import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css"; // Assurez-vous que les styles CSS sont bien importés
import Accueil from "./pages/Accueil";
import CreationQuestion from "./pages/CreationQuestion";
import Question from "./pages/Question";
import Connecter from "./pages/Connecter";
import Inscrire from "./pages/Inscrire";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/verificationUser", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState(false);
        } else {
          setAuthState(true);
        }
      });
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <header>
            <nav className="navbar">
              <Link to="/">Questions</Link>/
              <Link to="/creeQuestion">Poser votre question</Link>
              {!authState && (
                <>
                  /<Link to="/connexion">Se connecter</Link> /
                  <Link to="/inscrire">S'incrire</Link>
                </>
              )}
            </nav>
          </header>
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/creeQuestion" element={<CreationQuestion />} />
            <Route path="/question/:id" element={<Question />} />
            <Route path="/connexion" element={<Connecter />} />
            <Route path="/inscrire" element={<Inscrire />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
