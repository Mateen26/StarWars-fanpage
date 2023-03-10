import React from "react";
import Navbar from "./components/Navbar";
import { Switch, Route } from "react-router-dom";
import Films from "./components/subComponents/Films";
import People from "./components/subComponents/People";
import Planets from "./components/subComponents/Planets";
import StarShips from "./components/subComponents/StarShips";
import Home from "./components/subComponents/Home";

const App = () => {
  return (
    <Switch>
      <Route exact path="/">
      <Home/>
      </Route>

      <Route path="/films">
        <Films/>
      </Route>

      <Route path="/people">
        <People/>
      </Route>

      <Route path="/planets">
        <Planets/>
      </Route>
      <Route path="/starShips">
        <StarShips/>
      </Route>
    </Switch>
  );
};

export default App;
