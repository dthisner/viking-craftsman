import React, { Component } from "react";
import axios from "axios";
import { Card, Header, Icon } from "semantic-ui-react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

let endpoint = `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT_BE}/${process.env.REACT_APP_API_VERSION}/api`;

function BoozeName(props) {
  return (
    <Card.Header textAlign="left">
      <div style={{ wordWrap: "break-word" }}>{props.name}</div>
    </Card.Header>
  );
}

function BoozeVotes(props) {
  const cookie = cookies.get(props._id);
  let colorName = "";
  let voted;
  if (cookie === "notVoted") {
    colorName = "green";
    voted = true;
  } else {
    colorName = "grey";
    voted = false;
  }

  return (
    <Card.Content textAlign="left" extra>
      <Icon
        name="beer"
        color={colorName}
        onClick={() => props.updateVote(props._id, voted, props.office)}
      />
      {props.votes}
    </Card.Content>
  );
}

class ListRequest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      booze: "",
      items: [],
    };
  }

  componentDidMount() {
    this.getBooze();
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  // Submit the beer
  onSubmit = () => {
    let { booze } = this.state;
    // console.log("PRINTING task", this.state.task);
    if (booze) {
      axios
        .post(
          `${endpoint}/booze`,
          {
            booze,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          this.getTask();
          this.setState({
            task: "",
          });
          console.log(res);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  getBooze = () => {
    const office = this.props.officeLocation;
    axios
      .get(`${endpoint}/booze`, {
        params: {
          office_location: this.props.officeLocation,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data) {
          this.setState({
            items: res.data.map((item) => {
              return (
                <Card key={item._id} fluid>
                  <Card.Content>
                    <BoozeName name={item.name} />
                    <Card.Meta textAlign="left">
                      <span className="date">{item.base_type}</span>
                    </Card.Meta>
                    <Card.Description textAlign="left">
                      <p>Submitted because: {item.request.why}</p>
                    </Card.Description>
                    <Card.Meta textAlign="right">
                      <div>
                        {" "}
                        Submitted By: {item.request.firstName}{" "}
                        {item.request.lastName}
                      </div>
                    </Card.Meta>
                  </Card.Content>
                  <BoozeVotes
                    votes={item.votes}
                    _id={item._id}
                    updateVote={this.updateVote}
                    office={office}
                  />
                </Card>
              );
            }),
          });
        } else {
          this.setState({
            items: [],
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  updateVote = (id, voted, office) => {
    let value;

    if (voted) {
      value = -1;
      cookies.set(id, "voted");
    } else {
      value = 1;
      cookies.set(id, "notVoted");
    }

    axios({
      method: "put",
      url: `${endpoint}/booze/ranking/${id}`,
      data: { value: value },
      params: { office_location: office },
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        console.log(res);
        this.getBooze();
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
  };

  render() {
    return (
      <div style={{ paddingTop: 10 }}>
        <div className="row">
          <Header className="header" as="h2">
            Booze List
          </Header>
        </div>
        <div className="row">
          <Card.Group>{this.state.items}</Card.Group>
        </div>
      </div>
    );
  }
}

export default ListRequest;
