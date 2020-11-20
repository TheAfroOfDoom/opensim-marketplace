import React from "react";
import "./Navbar.css";
import Navbar from "react-bootstrap/Navbar";
import Cookies from "js-cookie";
import { Nav, Form, Button } from "react-bootstrap";
import axios from "axios";
import {
  Link,
  Redirect,
} from "react-router-dom";

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { search: "", redirect: false };
  }

  onClick = async () => {
    const response = await axios.get("/api/search", {
      params: {
        searchString: this.state.search,
      },
    });
    this.props.searchData(response.data);
    this.setState({ redirect: true });
  };

  handleChange(event) {
    let fleldVal = event.target.value;
    this.setState({ search: fleldVal });
  }


  checkStatus = () => {
    if(this.props.data){
      console.log('Logging Out');
      Cookies.remove('uuid');
      this.props.handleLogin(false);
    }else{
      console.log("Not Logged In");
    }
  };


  render() {
    return (
      <header>
        <Navbar variant="dark" bg="dark" expand="lg" style={{ paddingLeft: "10px" }}>
          <Link exact to="/">
            <Navbar.Brand>
              <img className="d-inline-block align-top" src="minilogo.png" style={{ height: 30, width: 30 }} />{' '}
              OpenSim Marketplace
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Link to="/inventory">
              <Navbar.Brand>Inventory</Navbar.Brand>
            </Link>
            <Link to="/login" onClick={this.checkStatus}>
              <Navbar.Brand>Logout</Navbar.Brand>
            </Link>
            <Form inline onSubmit={this.onClick}>
              <Form.Control
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                onChange={this.handleChange.bind(this)}
                onSubmit={this.onClick}
              />

              <Link to="/search">
                <Button type="submit" onClick={this.onClick} variant="success">
                  <span>Search</span>
                </Button>
              </Link>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        {this.state.redirect ? <Redirect to="/search" /> : <div />}

      </header>
    );
  }
}





export default NavigationBar;



/*
<Link exact to="/">
  <Navbar.Brand>
    <div style={{ fontSize: "1.5rem" }}>OpenSim Marketplace</div>
  </Navbar.Brand>
</Link>
*/
