import React, { ReactElement } from "react";
import "./App.css";

import Register from "./component/register/register";

function App(): ReactElement {
  return (
    <div className="App">
      <header className="App-header">
        <Register />
      </header>
    </div>
  );
}

export default App;
