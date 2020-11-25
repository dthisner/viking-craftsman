import React, { Component } from "react";
import { Form, Input, TextArea, Button, Select } from "semantic-ui-react";
import axios from "axios";
import PropTypes from "prop-types";

const typeOptions = [
  { key: "b", text: "Beer", value: "beer" },
  { key: "w", text: "Wine", value: "wine" },
  { key: "o", text: "Other", value: "other" },
];

const officeOptions = [
  { key: "v", text: "Vancouver", value: "vancouver" },
  { key: "t", text: "Toronto", value: "toronto" },
];

let endpoint = `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT_BE}/${process.env.REACT_APP_API_VERSION}/api`;

FormRequestBooze.propTypes = {
  officeLocation: PropTypes.string,
};

export default class FormRequestBooze extends Component {
  state = {
    name: "Bob",
    baseType: "whiskey",
    officeLocation: "vancouver",
    why: "So Good",
    firstName: "Auto",
    lastName: "Mate",
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const {
      name,
      baseType,
      officeLocation,
      why,
      firstName,
      lastName,
    } = this.state;

    axios({
      method: "post",
      url: `${endpoint}/booze/request`,
      data: {
        name,
        baseType,
        officeLocation,
        request: {
          why,
          firstName,
          lastName,
        },
      },
      params: {
        office_location: this.props.officeLocation,
      },
      headers: { "Content-Type": "application/json" },
    })
      .then(() => {
        //access the results here....
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("Problem with the response");
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log("Problem with the Request");
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Some other problem");
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
    this.setState({
      name: "",
      baseType: "",
      officeLocation: "",
      why: "",
      firstName: "",
      lastName: "",
    });
  };

  render() {
    const {
      name,
      baseType,
      officeLocation,
      why,
      firstName,
      lastName,
    } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <h3> Tell us about the Booze you would like </h3>
        <Form.Group widths="equal">
          <Form.Field
            required
            id="name"
            control={Input}
            label="Name"
            name="name"
            value={name}
            placeholder="The Name of the booze"
            onChange={this.handleChange}
          />
          <Form.Field
            required
            control={Select}
            options={typeOptions}
            label={{ children: "Type", htmlFor: "boozeType" }}
            placeholder="Type"
            search
            searchInput={{ id: "baseType" }}
            name="baseType"
            value={baseType}
            onChange={this.handleChange}
          />
          <Form.Field
            required
            control={Select}
            options={officeOptions}
            label={{ children: "Office", htmlFor: "officeLocation" }}
            placeholder="Office"
            search
            searchInput={{ id: "officeLocation" }}
            name="officeLocation"
            value={officeLocation}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Field
          required
          id="why"
          control={TextArea}
          label="But... why?"
          placeholder="Why should we bring this in?"
          name="why"
          value={why}
          onChange={this.handleChange}
        />
        <h3> Tell us who you are, please :) </h3>
        <Form.Group widths="equal">
          <Form.Field
            required
            id="firstName"
            control={Input}
            label="First Name"
            placeholder="First Name"
            name="firstName"
            value={firstName}
            onChange={this.handleChange}
          />
          <Form.Field
            required
            id="lastName"
            control={Input}
            label="Last Name"
            placeholder="Last Name"
            name="lastName"
            value={lastName}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Field
          required
          id="send-button"
          control={Button}
          content="Send Request"
        />
      </Form>
    );
  }
}
