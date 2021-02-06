import React from "react";

import "./Navbar.css";
import Navbar from "react-bootstrap/Navbar";
import Cookies from "js-cookie";
import {
  Nav,
  Form,
  Button,
  Collapse,
  NavDropdown,
  InputGroup,
} from "react-bootstrap";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { withStyles, ThemeProvider } from '@material-ui/core/styles';
import { DateTimePicker,  MuiPickersUtilsProvider } from '@material-ui/pickers'
import { Container, Grid, Drawer, Divider, List, Typography, TextField, Switch, createMuiTheme } from "@material-ui/core";
import Moment from "react-moment";
import moment from "moment";
import MomentUtils from "@date-io/moment";


const styles = {
  root: {
    marginTop:"30px"
  },
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  paper: {
    background: "#343a40"
  },
  title: {
    color: "white",
    textAlign: "center",
  },
  input: {
    paddingLeft: "10px",
    paddingRight: "10px",
    marginTop: "1.5rem"
  },
  dateInput: {

    marginTop: "1rem",
    textAlign: "center",
  },
  date: {
    color: "#fff",
    textColor: "#fff"
  },
  dateToggle: {
    color: "white",
    display: "inline-block",
    paddingLeft: "10px",
    marginTop: "1.5rem"
  },
  inline:{
    display: "inline",
  }
};

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
<<<<<<< Updated upstream
    this.state = { search: "",
                 redirect: false,
                     open: false,
                    check1: false,
                    check2: false,
                    check3: false,
                    check4: false,
                    limit: 0,
                     type: undefined,
                     order: "default",
                     dateStart: undefined,
                     dateEnd: undefined,
                     Invalid: false,
                     total: 0,
                     valueStartDate: undefined,
                     valueEndDate: undefined,
                  };
=======
    this.state = {
      search: "",
      redirect: false,
      open: false,
      num: 0,
      check: false,
      limit: 0,
      type: undefined,
      order: "default",
    };
>>>>>>> Stashed changes
  }

  //handles search button click functionality
  onClick = () => {
<<<<<<< Updated upstream
    //callback function, sends the user search string as well as the various advance search options they have selected
    this.props.searchData(this.state.search, this.state.limit, this.state.type, this.state.order, this.state.dateStart, this.state.dateEnd);
    //redirects to search page
=======
    this.props.searchData(
      this.state.search,
      this.state.num,
      this.state.limit,
      this.state.type,
      this.state.order
    );
>>>>>>> Stashed changes
    this.setState({ redirect: true });
  };

  //Query's for the total number of public assets
  getTotal = async () => {
    const response = await axios.get("/api/search/public");
    this.setState({total: response.data.count});
  }

  //Limit Check
  onCheck1(event) {
<<<<<<< Updated upstream
    if(event.target.checked == false){
      this.setState({limit: 0, check1: false});
    }
    if(event.target.checked == true){
      this.setState({check1: true});
=======
    if (event.target.checked == false) {
      this.setState({ num: 0, limit: 0, check1: false });
    }
    if (event.target.checked == true) {
      this.setState({ num: 1, check1: true });
>>>>>>> Stashed changes
    }
  }

  //Asset Type Check
  onCheck2(event) {
<<<<<<< Updated upstream
    if(event.target.checked == false){
      this.setState({type: undefined, check2: false});
    }
    if(event.target.checked == true){
      this.setState({check2: true});
=======
    if (event.target.checked == false) {
      this.setState({ num: 0, type: undefined, check2: false });
    }
    if (event.target.checked == true) {
      this.setState({ num: 1, check2: true });
>>>>>>> Stashed changes
    }
  }

  //Order Check
  onCheck3(event) {
<<<<<<< Updated upstream
    if(event.target.checked == false){
      this.setState({order: "default", check3: false});
    }
    if(event.target.checked == true){
      this.setState({check3: true});
    }
  }

  //Creation Date/Time Check
  onCheck4(event) {
    if(event.target.checked == false){
      this.setState({dateStart: undefined, dateEnd: undefined, valueStartDate: undefined, valueEndDate: undefined, check4: false});
    }
    if(event.target.checked == true){
      this.setState({check4: true});
    }
  }

  //Handles limit type value
  limitSelect(event){
    //gets total number of public assets
    this.getTotal();

    //checks if user selected limit value is between the total number of assets and zero
    if(event.target.value >= this.state.total || event.target.value <= 0 ){
      this.setState({Invalid: true});
    }else{
      this.setState({limit: event.target.value, Invalid: false});
    }
  }

  //Handles asset type value
  typeSelect(event){
    this.setState({type: event.target.value});
  }

  //Handles asset order value
  orderSelect(event){
    this.setState({order: event.target.value});
=======
    if (event.target.checked == false) {
      this.setState({ num: 0, order: "default", check3: false });
    }
    if (event.target.checked == true) {
      this.setState({ num: 1, check3: true });
    }
  }

  limitSelect(event) {
    //console.log("The thing: ", event.target.value);
    this.setState({ limit: event.target.value });
  }

  typeSelect(event) {
    //console.log("The thing: ", event.target.value);
    this.setState({ type: event.target.value });
  }

  orderSelect(event) {
    //console.log("The thing: ", event.target.value);
    this.setState({ order: event.target.value });
>>>>>>> Stashed changes
  }

  //Handles start create date value
  dateStartSelect(date){
    this.setState({dateStart: date.unix(), valueStartDate: date});
  }
  //Handles end create date value
  dateEndSelect(date){
    this.setState({dateEnd: date.unix(), valueEndDate: date});
  }

  //toggles advanced search drawer
  toggle = () => {
<<<<<<< Updated upstream
    this.setState({open: !this.state.open, redirect: true });
  }
=======
    let toggler = this.state.open;
    toggler = !toggler;
    this.setState({ open: toggler });
  };
>>>>>>> Stashed changes

  //Handles search-string value
  handleChange(event) {
    let fleldVal = event.target.value;
    this.setState({ search: fleldVal });
  }

  //Handles logout functionality
  Logout = () => {
    //Checks if user is logged in
    if (this.props.data) {
      //if logged in removes cookie
      console.log("Logging Out");
      Cookies.remove("uuid");
      //callback function setting loggedIn state to false
      this.props.handleLogin(false);
    } else {
      console.log("Not Logged In");
    }
  };

  render() {
<<<<<<< Updated upstream
    const { classes } = this.props;
=======
>>>>>>> Stashed changes
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
            <Link to="/map">
              <Navbar.Brand>Map</Navbar.Brand>
            </Link>
            <Link to="/inventory">
              <Navbar.Brand>Inventory</Navbar.Brand>
            </Link>
            <Link to="/login" onClick={this.Logout}>
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
                  Search
                </Button>
              </Link>
              <Link to="/search">
                <Button
                  onClick={this.toggle}
                  aria-controls="example-collapse-text"
                  aria-expanded={this.state.open}
                  variant="danger"
                  style={{marginLeft:"10px"}}
                >
                  Advanced
                </Button>
              </Link>
<<<<<<< Updated upstream
=======
              <Button
                onClick={this.toggle}
                aria-controls="example-collapse-text"
                aria-expanded={this.state.open}
                variant="danger"
                style={{ marginLeft: "10px" }}
              >
                Advanced
              </Button>
              <Navbar.Collapse in={this.state.open}>
                <NavDropdown title="" id="basic-nav-dropdown">
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>Limit</InputGroup.Text>
                      <InputGroup.Checkbox
                        onChange={this.onCheck1.bind(this)}
                      ></InputGroup.Checkbox>
                    </InputGroup.Prepend>
                    <Form.Control
                      onChange={this.limitSelect.bind(this)}
                      as="select"
                      disabled={!this.state.check1}
                    >
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
                      <InputGroup.Checkbox
                        onChange={this.onCheck2.bind(this)}
                      ></InputGroup.Checkbox>
                    </InputGroup.Prepend>
                    <Form.Control
                      onChange={this.typeSelect.bind(this)}
                      as="select"
                      disabled={!this.state.check2}
                    >
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
                      <InputGroup.Checkbox
                        onChange={this.onCheck3.bind(this)}
                      ></InputGroup.Checkbox>
                    </InputGroup.Prepend>
                    <Form.Control
                      onChange={this.orderSelect.bind(this)}
                      as="select"
                      disabled={!this.state.check3}
                    >
                      <option value="CREATE_ASC">Create Time Ascending</option>
                      <option value="CREATE_DESC">
                        Create Time Descending
                      </option>
                      <option value="NAME_ASC">Name Ascending</option>
                      <option value="NAME_DESC">Name Descending</option>
                      <option value="ACCESS_ASC">Access Time Ascending</option>
                      <option value="ACCESS_DESC">
                        Access Time Descending
                      </option>
                    </Form.Control>
                  </InputGroup>
                </NavDropdown>
              </Navbar.Collapse>
>>>>>>> Stashed changes
            </Form>
          </Navbar.Collapse>
        </Navbar>
        <div>
          <Drawer anchor="left" open={this.state.open} ModalProps={{ onBackdropClick: this.toggle }} classes={{paper: classes.paper, root: classes.root}}>
            <div className={classes.list}>
              <List>
                <div className={classes.title}>
                  <Typography variant="h3" gutterBottom>
                  Advanced Search
                  </ Typography>
                </div>
                <Divider />
                <div className={classes.input}>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>Limit</InputGroup.Text>
                      <InputGroup.Checkbox checked={this.state.check1} onChange={this.onCheck1.bind(this)}></InputGroup.Checkbox>
                    </InputGroup.Prepend>
                      <Form.Control
                        as="input"
                        type="number"
                        disabled={!this.state.check1}
                        value={this.state.limit}
                        isInvalid={this.state.Invalid}
                        onChange={this.limitSelect.bind(this)}>
                      </Form.Control>
                  </InputGroup>
                </div>
                <div className={classes.input}>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>Type</InputGroup.Text>
                      <InputGroup.Checkbox checked={this.state.check2} onChange={this.onCheck2.bind(this)}></InputGroup.Checkbox>
                    </InputGroup.Prepend>
                      <Form.Control
                        as="select"
                        disabled={!this.state.check2}
                        value={this.state.type}
                        onChange={this.typeSelect.bind(this)}>
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
                </div>
                <div className={classes.input}>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>Order</InputGroup.Text>
                      <InputGroup.Checkbox checked={this.state.check3} onChange={this.onCheck3.bind(this)}></InputGroup.Checkbox>
                    </InputGroup.Prepend>
                      <Form.Control
                        as="select"
                        disabled={!this.state.check3}
                        value={this.state.order}
                        onChange={this.orderSelect.bind(this)}>
                        <option value="CREATE_ASC">Create Time Ascending</option>
                        <option value="CREATE_DESC">Create Time Descending</option>
                        <option value="NAME_ASC">Name Ascending</option>
                        <option value="NAME_DESC">Name Descending</option>
                        <option value="ACCESS_ASC">Access Time Ascending</option>
                        <option value="ACCESS_DESC">Access Time Descending</option>
                      </Form.Control>
                  </InputGroup>
                </div>
                <div className={classes.dateToggle}>
                  <Typography className={classes.inline} variant="h5" >
                  Creation Date
                  </ Typography>
                  <Switch style={{display: "inline"}} color="primary" checked={this.state.check4} onChange={this.onCheck4.bind(this)}/>
                </div>
                <div className={classes.dateInput}>
                  <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
                    <DateTimePicker
                      label="Start Creation Date"
                      ampm={false}
                      showTodayButton={true}
                      value={this.state.valueStartDate}
                      disabled={!this.state.check4}
                      onChange={() => null}
                      onAccept={this.dateStartSelect.bind(this)}
                      InputProps={{ className: classes.date }}
                    />
                  </MuiPickersUtilsProvider>
                </div>
                <div className={classes.dateInput}>
                  <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
                    <DateTimePicker
                      label="End Creation Date"
                      ampm={false}
                      showTodayButton={true}
                      value={this.state.valueEndDate}
                      disabled={!this.state.check4}
                      onChange={() => null}
                      onAccept={this.dateEndSelect.bind(this)}
                      InputProps={{ className: classes.date }}
                    />
                  </MuiPickersUtilsProvider>
                </div>
              </List>
            </div>
          </Drawer>
        </div>
        {this.state.redirect ? <Redirect to="/search" /> : <div />}
      </header>
    );
  }
}

export default withStyles(styles)(NavigationBar);
