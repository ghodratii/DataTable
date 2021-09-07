import React from "react";
import { Switch, Route } from "react-router-dom";
import TablePage from "./pages/TablePage/tablePage";

import "./App.scss";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={TablePage} />
      </Switch>
    </div>
  );
}

export default App;
