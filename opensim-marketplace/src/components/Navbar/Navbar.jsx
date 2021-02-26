import React from "react";

import "./Navbar.css";
import Navbar from "react-bootstrap/Navbar";
import Cookies from "js-cookie";
import { Nav, Form, Button, InputGroup } from "react-bootstrap";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import {
  Drawer,
  Divider,
  List,
  Typography,
  Switch,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import moment from "moment";
import MomentUtils from "@date-io/moment";

const styles = {
  root: {
    marginTop: "30px",
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  paper: {
    background: "#343a40",
  },
  title: {
    color: "white",
    textAlign: "center",
  },
  input: {
    paddingLeft: "10px",
    paddingRight: "10px",
    marginTop: "1.5rem",
  },
  dateInput: {
    marginTop: "1rem",
    textAlign: "center",
  },
  date: {
    color: "#fff",
    textColor: "#fff",
  },
  dateToggle: {
    color: "white",
    display: "inline-block",
    paddingLeft: "10px",
    marginTop: "1.5rem",
  },
  inline: {
    display: "inline",
  },
};

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      redirect: false,
      drawerOpen: false,
      logoutOpen: false,
      check1: false,
      check2: false,
      check3: false,
      check4: false,
      limit: 0,
      type: undefined,
      order: "",
      dateStart: undefined,
      dateEnd: undefined,
      Invalid: false,
      total: 0,
      valueStartDate: undefined,
      valueEndDate: undefined,
    };
  }

  //handles search button click functionality
  onClick = () => {
    //callback function, sends the user search string as well as the various advance search options they have selected
    this.props.searchData(
      this.state.search,
      this.state.limit,
      this.state.type,
      this.state.order,
      this.state.dateStart,
      this.state.dateEnd
    );
    //redirects to search page
    this.setState({ redirect: true });
  };

  //Query's for the total number of public assets
  getTotal = async () => {
    const response = await axios.get("/api/search/public");
    this.setState({ total: response.data.count });
  };

  //Limit Check
  onCheck1(event) {
    if (event.target.checked == false) {
      this.setState({ limit: 0, check1: false });
    }
    if (event.target.checked == true) {
      this.setState({ check1: true });
    }
  }

  //Asset Type Check
  onCheck2(event) {
    if (event.target.checked == false) {
      this.setState({ type: undefined, check2: false });
    }
    if (event.target.checked == true) {
      this.setState({ check2: true });
    }
  }

  //Order Check
  onCheck3(event) {
    if (event.target.checked == false) {
      this.setState({ order: "default", check3: false });
    }
    if (event.target.checked == true) {
      this.setState({ check3: true });
    }
  }

  //Creation Date/Time Check
  onCheck4(event) {
    if (event.target.checked == false) {
      this.setState({
        dateStart: undefined,
        dateEnd: undefined,
        valueStartDate: undefined,
        valueEndDate: undefined,
        check4: false,
      });
    }
    if (event.target.checked == true) {
      this.setState({ check4: true });
    }
  }

  //Handles limit type value
  limitSelect(event) {
    //gets total number of public assets
    this.getTotal();
    //checks if user selected limit value is between the total number of assets and zero
    if (event.target.value >= this.state.total || event.target.value <= 0) {
      this.setState({ Invalid: true });
    } else {
      this.setState({ limit: event.target.value, Invalid: false });
    }
  }

  //Handles asset type value
  typeSelect(event) {
    this.setState({ type: event.target.value });
  }

  //Handles asset order value
  orderSelect(event) {
    this.setState({ order: event.target.value });
  }

  //Handles start create date value
  dateStartSelect(date) {
    this.setState({ dateStart: date.unix(), valueStartDate: date });
  }
  //Handles end create date value
  dateEndSelect(date) {
    this.setState({ dateEnd: date.unix(), valueEndDate: date });
  }

  //toggles advanced search drawer
  toggle = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen, redirect: true });
  };

  Confirmation = () => {
    this.setState({ logoutOpen: !this.state.logoutOpen });
  };
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
      Cookies.remove("sid");
      this.setState({ logoutOpen: false });
      //callback function setting loggedIn state to false
      this.props.handleLogin(false);
    } else {
      console.log("Not Logged In");
    }
  };

  render() {
    const { classes } = this.props;
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
                alt=""
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

            <Button onClick={this.Confirmation} style={{ marginRight: "10px" }}>
              Logout
            </Button>
            <Dialog
              open={this.state.logoutOpen}
              onClose={this.Confirmation}
              fullWidth={false}
              maxWidth="xs"
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Are You Sure You Want To Logout?"}
              </DialogTitle>
              <DialogActions>
                <Button onClick={this.Confirmation} variant="danger">
                  Cancel
                </Button>
                <Link to="/login">
                  <Button onClick={this.Logout} variant="primary">
                    Logout
                  </Button>
                </Link>
              </DialogActions>
            </Dialog>
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
                  aria-expanded={this.state.drawerOpen}
                  variant="danger"
                  style={{ marginLeft: "10px" }}
                >
                  Advanced
                </Button>
              </Link>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        <div>
          <Drawer
            anchor="left"
            open={this.state.drawerOpen}
            ModalProps={{ onBackdropClick: this.toggle }}
            classes={{ paper: classes.paper, root: classes.root }}
          >
            <div className={classes.list}>
              <List>
                <div className={classes.title}>
                  <Typography variant="h3" gutterBottom>
                    Advanced Search
                  </Typography>
                </div>
                <Divider />
                <div className={classes.input}>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>Limit</InputGroup.Text>
                      <InputGroup.Checkbox
                        data-testid="switch1"
                        checked={this.state.check1}
                        onChange={this.onCheck1.bind(this)}
                      ></InputGroup.Checkbox>
                    </InputGroup.Prepend>
                    <Form.Control
                      data-testid="num-input"
                      as="input"
                      type="number"
                      disabled={!this.state.check1}
                      value={this.state.limit}
                      isInvalid={this.state.Invalid}
                      onChange={this.limitSelect.bind(this)}
                    ></Form.Control>
                  </InputGroup>
                </div>
                <div className={classes.input}>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>Type</InputGroup.Text>
                      <InputGroup.Checkbox
                        data-testid="switch2"
                        checked={this.state.check2}
                        onChange={this.onCheck2.bind(this)}
                      ></InputGroup.Checkbox>
                    </InputGroup.Prepend>
                    <Form.Control
                      data-testid="select1"
                      as="select"
                      disabled={!this.state.check2}
                      onChange={this.typeSelect.bind(this)}
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
                </div>
                <div className={classes.input}>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>Order</InputGroup.Text>
                      <InputGroup.Checkbox
                        data-testid="switch3"
                        checked={this.state.check3}
                        onChange={this.onCheck3.bind(this)}
                      ></InputGroup.Checkbox>
                    </InputGroup.Prepend>
                    <Form.Control
                      data-testid="select2"
                      as="select"
                      disabled={!this.state.check3}
                      value={this.state.order}
                      onChange={this.orderSelect.bind(this)}
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
                </div>
                <div className={classes.dateToggle}>
                  <Typography className={classes.inline} variant="h5">
                    Creation Date
                  </Typography>
                  <Switch
                    style={{ display: "inline" }}
                    color="primary"
                    checked={this.state.check4}
                    onChange={this.onCheck4.bind(this)}
                  />
                </div>
                <div className={classes.dateInput}>
                  <MuiPickersUtilsProvider
                    libInstance={moment}
                    utils={MomentUtils}
                  >
                    <DateTimePicker
                      data-testid="date"
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
                  <MuiPickersUtilsProvider
                    libInstance={moment}
                    utils={MomentUtils}
                  >
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
