import React from "react";

import "./Navbar.css";
import Navbar from "react-bootstrap/Navbar";
import Cookies from "js-cookie";
import { Nav, Form, Button, Collapse, NavDropdown, InputGroup } from "react-bootstrap";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { search: "",
                 redirect: false,
                     open: false,
                      num: 0,
                    check: false,
                    limit: 0,
                     type: undefined,
                     order: "default",
                  };
  }

  onClick = () => {
    this.props.searchData(this.state.search, this.state.num, this.state.limit, this.state.type, this.state.order);
    this.setState({ redirect: true });
  };

  //Limit Check
  onCheck1(event) {
    if(event.target.checked == false){
      this.setState({num: 0, limit: 0, check1: false});
    }
    if(event.target.checked == true){
      this.setState({num: 1, check1: true});
    }
  }

  //Asset Type Check
  onCheck2(event) {
    if(event.target.checked == false){
      this.setState({num: 0, type: undefined, check2: false});
    }
    if(event.target.checked == true){
      this.setState({num: 1, check2: true});
    }
  }

  //Order Check
  onCheck3(event) {
    if(event.target.checked == false){
      this.setState({num: 0, order: "default", check3: false});
    }
    if(event.target.checked == true){
      this.setState({num: 1, check3: true});
    }
  }

  limitSelect(event){
    //console.log("The thing: ", event.target.value);
    this.setState({limit: event.target.value});
  }

  typeSelect(event){
    //console.log("The thing: ", event.target.value);
    this.setState({type: event.target.value});
  }

  orderSelect(event){
    //console.log("The thing: ", event.target.value);
    this.setState({order: event.target.value});
  }

  toggle = () => {
    let toggler = this.state.open;
    toggler = !toggler;
    this.setState({open: toggler});
  }

  handleChange(event) {
    let fleldVal = event.target.value;
    this.setState({ search: fleldVal});
  }

  checkStatus = () => {
    if (this.props.data) {
      console.log("Logging Out");
      Cookies.remove("uuid");
      this.props.handleLogin(false);
    } else {
      console.log("Not Logged In");
    }
  };

  render() {

    return (
      <header>
        <Navbar
          variant="dark"
          bg="dark"
          expand="lg"
          style={{ paddingLeft: "10px" }}
        >
          <Link exact to="/">
            <Navbar.Brand>
              <img
                className="d-inline-block align-top"
                src="minilogo.png"
                style={{ height: 30, width: 30 }}
              />{" "}
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
              <Button
                onClick={this.toggle}
                aria-controls="example-collapse-text"
                aria-expanded={this.state.open}
                variant="danger"
                style={{marginLeft:"10px"}}
              >
                Advanced
              </Button>
              <Navbar.Collapse in={this.state.open}>
                 <NavDropdown title="" id="basic-nav-dropdown">

                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>Limit</InputGroup.Text>
                        <InputGroup.Checkbox onChange={this.onCheck1.bind(this)}></InputGroup.Checkbox>
                      </InputGroup.Prepend>
                        <Form.Control onChange={this.limitSelect.bind(this)} as="select" disabled={!this.state.check1}>
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                          <option value={4}>4</option>
                          <option value={5}>5</option>
                        </Form.Control>
                    </InputGroup>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>Type</InputGroup.Text>
                        <InputGroup.Checkbox onChange={this.onCheck2.bind(this)}></InputGroup.Checkbox>
                      </InputGroup.Prepend>
                        <Form.Control onChange={this.typeSelect.bind(this)} as="select" disabled={!this.state.check2}>
                          <option value={-2}>Material</option>
                          <option value={0}>Texture</option>
                          <option value={1}>Sound</option>
                          <option value={2}>Calling Card</option>
                          <option value={3}>Landmark</option>
                          <option value={5}>Clothing</option>
                          <option value={6}>Object</option>
                          <option value={7}>Notecard</option>
                          <option value={10}>Script</option>
                          <option value={13}>Body Part</option>
                          <option value={21}>Gesture</option>
                          <option value={49}>Mesh</option>
                        </Form.Control>
                    </InputGroup>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>Order</InputGroup.Text>
                        <InputGroup.Checkbox onChange={this.onCheck3.bind(this)}></InputGroup.Checkbox>
                      </InputGroup.Prepend>
                        <Form.Control onChange={this.orderSelect.bind(this)} as="select" disabled={!this.state.check3}>
                          <option value="CREATE_ASC">Create Time Ascending</option>
                          <option value="CREATE_DESC">Create Time Descending</option>
                          <option value="NAME_ASC">Name Ascending</option>
                          <option value="NAME_DESC">Name Descending</option>
                          <option value="ACCESS_ASC">Access Time Ascending</option>
                          <option value="ACCESS_DESC">Access Time Descending</option>
                        </Form.Control>
                    </InputGroup>
                 </NavDropdown>
              </Navbar.Collapse>
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
