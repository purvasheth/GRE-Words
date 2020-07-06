import React, { useState } from "react";
import UserContext from "./UserContext";
import Home from "./Home";
import List from "./List";
import FlashCards from "./FlashCards";
import App from "./App";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function Main() {
  const user = useState({});
  return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/list" render={(props) => <List {...props} />} />
          <Route
            exact
            path="/flashcards"
            render={(props) => <FlashCards {...props} />}
          />
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default Main;
