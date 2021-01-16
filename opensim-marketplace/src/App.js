//Import React
import React from "react";

//Import CSS
import "./App.css";

//Import NPM Packages
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";

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
      filter: null,
      limit: 0,
      type: undefined,
      order: "default",
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

  handleSearchChange = (data, num, lim, type, order) => {
    this.setState({ data2: data, filter: num, limit: lim, type: type, order: order});
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

  render() {
    return (
      <div className="App">
        <Router basename="marketplace">
          {!Cookies.get("uuid") ? (
            !this.state.loggedIn ? (
              <div>
                <Route path="/login">
                  <LoginScreen handleLogin={this.handleLogin} />
                </Route>
                <Redirect to="/login" />
              </div>
            ) : (
              <div>
                <NavigationBar
                  searchData={this.handleSearchChange}
                  data={this.state.loggedIn}
                  handleLogin={this.handleLogin}

                />
                <Route path="/login">
                  <Redirect to="/" />
                </Route>
                <Route path="/inventory" component={InventoryScreen} />
                <Route path="/search">
                  <SearchScreen data={this.state.data2} filterType={this.state.filter} limitNumber={this.state.limit} typeAsset={this.state.type} orderType={this.state.order} activeDefault={0} />
                </Route>
                <Route path="/item/:assetId" component={ItemScreen} />
                <Route exact path="/">
                  <HomeScreen searchData={this.handleSearchChange} />
                </Route>
              </div>
            )
          ) : (
            <div data-testid="main">
              <NavigationBar
                searchData={this.handleSearchChange}
                data={this.state.loggedIn}
                handleLogin={this.handleLogin}
              />
              <Route path="/login">
                <Redirect to="/" />
              </Route>
              <Route path="/inventory" component={InventoryScreen} />
              <Route path="/search">
                <SearchScreen data={this.state.data2} filterType={this.state.filter} limitNumber={this.state.limit} typeAsset={this.state.type} orderType={this.state.order} activeDefault={0} />
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
