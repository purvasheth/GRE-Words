import React from "react";
import List from "./List";
import FlashCards from "./FlashCards";
import App from "./App";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Stats from "./Stats";
import Revision from "./Revision";

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
        <Route exact path="/stats" component={Stats} />
        <Route exact path="/revision" component={Revision} />
      </Switch>
    </BrowserRouter>
  );
}

export default Main;
