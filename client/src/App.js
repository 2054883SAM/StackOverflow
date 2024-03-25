import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css"; // Assurez-vous que les styles CSS sont bien importés
import Accueil from "./pages/Accueil";
import CreationQuestion from "./pages/CreationQuestion";
import Question from "./pages/Question";
import Connecter from "./pages/Connecter";
import PageNotFound from "./pages/PageNotFound";
import Inscrire from "./pages/Inscrire";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    statut: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/verificationUser", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, statut: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            statut: true,
          });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      id: 0,
      statut: false,
    });
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <header>
            <nav className="navbar">
              {/* Déplacer ces liens au début */}
              <Link to="/creeQuestion">Poser votre question</Link> /
              <Link to="/">Questions</Link>
              {/* Conditionner l'affichage de la partie droite */}
              <div className="auth-area">
                {!authState.statut ? (
                  <>
                    <Link to="/connexion">Se connecter</Link> /
                    <Link to="/inscrire">S'incrire</Link>
                  </>
                ) : (
                  <>
                    <button onClick={logout} className="logOut">
                      Logout
                    </button>
                    <span className="username">@{authState.username}</span>
                  </>
                )}
              </div>
            </nav>
          </header>
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/creeQuestion" element={<CreationQuestion />} />
            <Route path="/question/:id" element={<Question />} />
            <Route path="/connexion" element={<Connecter />} />
            <Route path="/inscrire" element={<Inscrire />} />
            <Route path="*" exact element={<PageNotFound/>}/>
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
