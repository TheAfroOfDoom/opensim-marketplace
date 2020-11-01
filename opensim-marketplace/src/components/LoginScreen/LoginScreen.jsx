import React from "react";

import { Form, FormGroup, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      password: "",
      loginSuccess: false,
    };
  }

  handleFirstName = (event) => {
    console.log("First Name:", event.target.value);
    this.setState({ firstName: event.target.value });
  };
  handleLastName = (event) => {
    console.log("Last Name:", event.target.value);
    this.setState({ lastName: event.target.value });
  };
  handlePassword = (event) => {
    console.log("Password:", event.target.value);
    this.setState({ password: event.target.value });
  };

  submitHandler = async (event) => {
    event.preventDefault();
    axios
      .get("/login", {
        params: {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          password: this.state.password,
        },
      })
      .then((response) => {
        if (response.status === 201) {
          console.log("Password worked");
          this.setState({ loginSuccess: true });
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <FormGroup role="form">
            <Row>
              <Col>
                <Form.Control
                  placeholder="First name"
                  onChange={this.handleFirstName.bind(this)}
                />
              </Col>
              <Col>
                <Form.Control
                  placeholder="Last name"
                  onChange={this.handleLastName.bind(this)}
                />
              </Col>
            </Row>

            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={this.handlePassword.bind(this)}
            />
            <Button
              type="submit"
              variant="primary"
              onClick={this.submitHandler}
            >
              Submit
            </Button>
          </FormGroup>
        </form>
        {this.state.loginSuccess ? <Redirect to="/" /> : <div />}
      </div>
    );
  }
}
