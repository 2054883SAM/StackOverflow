import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div>
      <h1>Page non trouvé :/</h1>
      <h3>Éssayer ce liens: <Link to="/">Questions</Link></h3>
    </div>
  );
}

export default PageNotFound;
