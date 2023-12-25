import "./App.css";
//Few updates; 'Switch' is now 'Routes' in v6. , also no longer require 'exact' ,
//and component in Route is now 'element={<Home/>}' for example
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Accueil from "./pages/Accueil";
import CreationQuestion from "./pages/CreationQuestion";

function App() {
  return (
    <div className="App">
      <Router>
        <header>
      <nav className="navbar">
      <Link to="/">Questions</Link>
      <Link to="creeQuestion">Poser votre question</Link>
      </nav>
      </header>
        <Routes>
          <Route path="/" element={<Accueil />}></Route>
          <Route path="/creeQuestion" element={<CreationQuestion />}></Route>
        </Routes>
        </Router>
    </div>
  );
}

export default App;
