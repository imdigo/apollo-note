import React from "react";
import { Query } from "react-apollo";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Notes from "../../routes/Notes";
import Note from "../../routes/Note/Note";
import Add from "../../routes/Add";
import Edit from "../../routes/Edit/Edit";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path={"/"} component={Notes}></Route>
        <Route path={"/add"} component={Add}></Route>
        <Route path={"/note/:id"} component={Note}></Route>
        <Route path={"/edit/:id"} component={Edit}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
