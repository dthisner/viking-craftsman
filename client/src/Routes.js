import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Admin from "./Admin/Admin";
import Vancouver from "./Vanocuver/Vancouver";
import Toronto from "./Toronto/Toronto";
import RequestBooze from "./ReguestBooze/RequestBooze";
import history from './history';

export default class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Vancouver} />
          <Route path="/vancouver" component={Vancouver} />
          <Route path="/toronto" component={Toronto} />
          <Route path="/requests" component={RequestBooze} />
          <Route path="/admin" component={Admin} />
        </Switch>
      </Router>
    )
  }
}