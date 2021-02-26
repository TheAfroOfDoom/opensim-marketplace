import React from "react";

import {
  Button,
  Container,
  TextField,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

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
    this.setState({ firstName: event.target.value });
  };
  handleLastName = (event) => {
    this.setState({ lastName: event.target.value });
  };
  handlePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  submitHandler = async (event) => {
    try {
      event.preventDefault();
      console.log("Submitting Credentials");
      const response = await axios.post("/api/wifi/login", {
        firstname: this.state.firstName,
        lastname: this.state.lastName,
        password: this.state.password,
      });

      if (response.status === 201) {
        console.log("Password worked");
        this.setState({ loginSuccess: true });
        this.props.handleLogin(true);
      }
    } catch (err) {
      console.log("Login Failed: " + err.message);
      this.setState({ loginFail: true });
    }
  };

  render() {
    return (
      <Container maxWidth="md">
        <Grid container justify="center" direction="row">
          <Grid item container>
            <Grid
              container
              direction="column"
              justify="center"
              spacing={2}
              className="login-form"
            >
              {this.state.loginFail ? (
                <Alert severity="error" className="error-message">
                  <AlertTitle>Password Incorrect</AlertTitle>
                </Alert>
              ) : (
                <div />
              )}
              <Paper
                variant="elevation"
                elevation={20}
                className="login-background"
              >
                <Grid item container justify="center">
                  <Typography component="h1" variant="h5">
                    Sign in
                  </Typography>
                </Grid>
                <Grid item>
                  <form onSubmit={this.submitHandler}>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <Typography component="h3">First Name</Typography>
                        <TextField
                          placeholder="First Name"
                          variant="outlined"
                          onChange={this.handleFirstName.bind(this)}
                          fullWidth
                        />
                      </Grid>
                      <Grid item>
                        <Typography component="h3">Last Name</Typography>
                        <TextField
                          placeholder="Last Name"
                          variant="outlined"
                          onChange={this.handleLastName.bind(this)}
                          fullWidth
                        />
                      </Grid>
                      <Grid item>
                        <Typography component="h3">Password</Typography>
                        <TextField
                          type="password"
                          placeholder="Password"
                          variant="outlined"
                          onChange={this.handlePassword.bind(this)}
                          required
                          fullWidth
                        />
                      </Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          className="button-block"
                        >
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        {this.state.loginSuccess ? <Redirect to="/" /> : <div />}
      </Container>
    );
  }
}
