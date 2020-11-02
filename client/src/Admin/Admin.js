import React, { Component } from "react";
import "../App.css";

import { Container } from "semantic-ui-react";
import AdminLogin from "../component/forms/adminLogin";

export default class Toronto extends Component {
  render() {
    return (
      <div>
        <h1>Admin</h1>
        <Container>
          <AdminLogin />
        </Container>
      </div>
    );
  }
}
