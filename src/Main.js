import React from "react";
import Home from "./Home";
import List from "./List";
import FlashCards from "./FlashCards";
import App from "./App";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function Main() {
  return (
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
  );
}

export default Main;
