//Import React
import React from "react";

//Import CSS
import "./App.css";

//Import NPM Packages
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Cookies from "js-cookie";
import Jumbotron from "react-bootstrap/Jumbotron";
import axios from "axios";

//Import Custom Components
import NavigationBar from "./components/Navbar/Navbar";
import ItemScreen from "./components/ItemScreen/ItemScreen";
import SearchScreen from "./components/Search/SearchScreen";
import LoginScreen from "./components/LoginScreen/LoginScreen";
import InventoryScreen from "./components/InventoryScreen/InventoryScreen";
import HomeScreen from "./components/HomeScreen/HomeScreen";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null,
      data2: null,
      loginStatus: null,
      loggedIn: false,
    };
  }

  componentDidMount() {
    let cookies = Cookies.get();
    if (cookies.hasOwnProperty("uuid")) {
      this.setState({ loggedIn: true });
    } else {
      this.setState({ loggedIn: false });
    }
  }

  handleSearchChange = (data) => {
    this.setState({ data2: data });
    console.log("DATA: " + data);
    console.log(Cookies.get());
  };

  checkStatus = () => {
    console.log(Cookies.get("uuid"));
    if (Cookies.get("uuid") === undefined) {
      return undefined;
    } else {
      return Cookies.get("uuid");
    }
  };

  handleLogin = (newValue) => {
    this.setState({ loggedIn: newValue });
  };

  setStatus = () => {
    this.setState({ loginStatus: Cookies.get("uuid") });
  };
  render() {
    this.checkStatus();
    return (
      <div className="App">
        <Router>
          {!this.state.loggedIn ? (
            <div>
              <Route path="/login">
                <LoginScreen handleLogin={this.handleLogin} />
              </Route>
              <Redirect to="/login" />
            </div>
          ) : (
            <div>
              <NavigationBar searchData={this.handleSearchChange} />
              <Route path="/login">
                <Redirect to="/" />
              </Route>
              <Route path="/inventory" component={InventoryScreen} />
              <Route path="/search">
                <SearchScreen data={this.state.data2} activeDefault={0} />
              </Route>
              <Route path="/item/:assetId" component={ItemScreen} />
              <Route exact path="/">
                <HomeScreen searchData={this.handleSearchChange} />
              </Route>
            </div>
          )}
        </Router>
      </div>
    );
  }
}

export default App;
