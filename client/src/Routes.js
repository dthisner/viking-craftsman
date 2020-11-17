import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import LandingPage from "./Pages/LandingPage/LandingPage";
import Toronto from "./Toronto/Toronto";
import RequestBooze from "./ReguestBooze/RequestBooze";
import history from "./history";

export default class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/home" component={LandingPage} />
          <Route path="/toronto" component={Toronto} />
          <Route path="/requests" component={RequestBooze} />
        </Switch>
      </Router>
    );
  }
}
