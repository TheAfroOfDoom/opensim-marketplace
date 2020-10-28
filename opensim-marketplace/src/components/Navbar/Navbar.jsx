import React from "react";
import "./Navbar.css";
import Navbar from "react-bootstrap/Navbar";
import { Nav, Form, FormControl, NavDropdown, Button } from "react-bootstrap";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
} from "react-router-dom";

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { search: "" };
  }

  onClick = () => {
    axios
      .get("/search", {
        params: {
          searchString: this.state.search,
        },
      })
      .then((response) => {
        //console.log(response.data);
        this.props.searchData(response.data);
      });
  };

  handleChange(event) {
    let fleldVal = event.target.value;
    this.setState({ search: fleldVal });
  }

  handleKeyPress(target) {
    if (target.charCode == 13) {
      this.onClick();
    }
  }

  render() {
    return (
      <header>
        <Navbar bg="light" expand="lg">
          <Link to="/">
            <Navbar.Brand>OpenSim Marketplace</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Link to="/Upload">
              <Navbar.Brand>Upload</Navbar.Brand>
            </Link>
            <Link to="/Login">
              <Navbar.Brand>Login</Navbar.Brand>
            </Link>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                onChange={this.handleChange.bind(this)}
              />

              <Link to="/search">
                <Button onClick={this.onClick} variant="outline-success">
                  <span>Search</span>
                </Button>
              </Link>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
  }
}

export default NavigationBar;
