import React from "react";

import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";
import SearchScreen from "../../components/Search/SearchScreen";
import Cookies from "js-cookie";
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

  submitHandler = async () => {
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
          console.log(Cookies.get());
        }
      })
      .catch((error) => {
        alert(error);
      });

  };



  render() {

    return (
      <div>
        <Form>
          <Form>
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
          </Form>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={this.handlePassword.bind(this)}
            />
          </Form.Group>
          <Button variant="primary" onClick={this.submitHandler}>
            Submit
          </Button>
        </Form>

        {this.state.loginSuccess ? <Redirect to="/" /> : <div />}

      </div>
    );
  }
}
