import React, { ReactElement } from "react";
import "./App.css";

import Register from "./component/register/register";
import FormationSideBar from "./component/formationSideBar/formationSideBar";

function App(): ReactElement {
  return (
    <div className="App">
      <header className="App-header">
        <Register />
        <FormationSideBar />
      </header>
    </div>
  );
}

export default App;
