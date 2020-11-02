import React, { Component } from "react";
import "../App.css";

import { Container } from "semantic-ui-react";
import ListBooze from "../component/listBooze/List-Booze";

export default class Vancouver extends Component {
  render() {
    return (
      <div>
        <h1>Vancouver</h1>
        <Container>
          <ListBooze officeLocation="vancouver" />
        </Container>
      </div>
    );
  }
}