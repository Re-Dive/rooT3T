import React, { ReactElement, useState } from "react";
import "./App.css";

import Register from "./component/register/register";
import FormationSideBar from "./component/formationSideBar/formationSideBar";

function App(): ReactElement {
  // confirmed List 5体のキャラらクターの並びを保存する
  const [confirmedList, setConfirmedList] = useState<string[][]>([]);

  return (
    <div className="App">
      <header className="App-header">
        <Register
          confirmedList={confirmedList}
          setConfirmedList={setConfirmedList}
        />
        <FormationSideBar
          confirmedList={confirmedList}
          setConfirmedList={setConfirmedList}
        />
      </header>
    </div>
  );
}

export default App;
