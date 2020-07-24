import React from "react";
import List from "./Home/List";
import FlashCards from "./Home/FlashCards";
import App from "./App";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home/Home";
import Stats from "./Stats/Stats";
import Revision from "./Revision/Revision";

function Main() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/list" render={(props) => <List {...props} />} />
        <Route
          exact
          path="/flashcards/:num"
          render={(props) => <FlashCards {...props} />}
        />
        <Route exact path="/stats" component={Stats} />
        <Route exact path="/revision" component={Revision} />
      </Switch>
    </BrowserRouter>
  );
}

export default Main;
