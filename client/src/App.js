import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css"; // Assurez-vous que les styles CSS sont bien importés
import Accueil from "./pages/Accueil";
import CreationQuestion from "./pages/CreationQuestion";
import Question from "./pages/Question";

function App() {
  return (
    <div className="App">
      <Router>
        <header>
          <nav className="navbar">
            <Link to="/">Questions</Link>
            /
            <Link to="/creeQuestion">Poser votre question</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/creeQuestion" element={<CreationQuestion />} />
          <Route path="/question/:id" element={<Question />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
