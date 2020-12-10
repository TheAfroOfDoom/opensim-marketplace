import React from "react";

import { Button, FormControl, FormGroup } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

import { Form, FormGroup } from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "./LoginScreen.css";
export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      password: "",
      loginSuccess: false,
      loginFail: false,
    };
  }

  handleFirstName = (event) => {
    console.log(event.target.value);
    this.setState({ firstName: event.target.value });
  };
  handleLastName = (event) => {
    console.log(event.target.value);
    this.setState({ lastName: event.target.value });
  };
  handlePassword = (event) => {
    console.log(event.target.value);
    this.setState({ password: event.target.value });
  };

  submitHandler = async (event) => {
    try {
      event.preventDefault();
      console.log("Submitting Credentials");
      const response = await axios.get("/api/login", {
        params: {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          password: this.state.password,
        },
      });

      if (response.status === 201) {
        console.log("Password worked");
        this.setState({ loginSuccess: true });
        this.props.handleLogin(true);
      }
    } catch (err) {
      console.log(err.message);
      this.setState({ loginFail: true });
    }
  };

  render() {
    return (
      <div className="outer">
        {this.state.loginFail ? (
          <Alert severity="error" className="error-message">
            <AlertTitle>Password Incorrect</AlertTitle>
          </Alert>
        ) : (
          <div />
        )}
        <div className="inner">
          <Form onSubmit={this.submitHandler}>
            <h3>Sign In</h3>
            <FormGroup>
              <div className="form-group">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  placeholder="First name"
                  onChange={this.handleFirstName.bind(this)}
                />
              </div>

              <div className="form-group">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  placeholder="Last name"
                  onChange={this.handleLastName.bind(this)}
                />
              </div>
              <div className="form-group">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={() => this.handlePassword.bind(this)}
                />
              </div>
              <Button
                variant="contained"
                type="submit"
                className="btn btn-block"
                onClick={this.submitHandler}
              >
                Submit
              </Button>
            </FormGroup>
          </Form>
        </div>
        {this.state.loginSuccess ? <Redirect to="/" /> : <div />}
      </div>
    );
  }
}
