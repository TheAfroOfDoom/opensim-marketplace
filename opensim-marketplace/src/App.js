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
import ErrorScreen from "./components/HomeScreen/ErrorScreen";
import MapScreen from "./components/Map/MapScreen";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null,
      data2: null,
      loginStatus: null,
      loggedIn: false,
      limit: 0,
      type: undefined,
      order: "default",
      Sdate: undefined,
      Edate: undefined,
    };
  }

  componentDidMount() {
    let cookies = Cookies.get();
    console.log("Checking cookie");
    if (cookies.hasOwnProperty("sid")) {
      this.setState({ loggedIn: true });
    } else {
      this.setState({ loggedIn: false });
    }
  }

  handleSearchChange = (data, lim, type, order, sdate, edate) => {
    this.setState({
      data2: data,
      limit: lim,
      type: type,
      order: order,
      Sdate: sdate,
      Edate: edate,
    });
  };

  checkStatus = () => {
    console.log(Cookies.get("sid"));
    if (Cookies.get("sid") === undefined) {
      return undefined;
    } else {
      return Cookies.get("sid");
    }
  };

  handleLogin = (newValue) => {
    this.setState({ loggedIn: newValue });
  };

  render() {
    return (
      <div className="App">
        <Router basename="marketplace">
          {!Cookies.get("sid") ? (
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
                <Route path="/search/:data" component={SearchScreen} />
                <Route path="/item/:assetId" component={ItemScreen} />
                <Route exact path="/">
                  <HomeScreen searchData={this.handleSearchChange} />
                </Route>
                <Route exact path="/404" component={ErrorScreen} />
                <Redirect to="/404" />
                <Route exact path="/map" component={MapScreen} />
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
              <Route path="/search" component={SearchScreen} />
              <Route path="/item/:assetId" component={ItemScreen} />
              <Route exact path="/">
                <HomeScreen searchData={this.handleSearchChange} />
              </Route>
              <Route exact path="/404" component={ErrorScreen}>
                <Redirect to="/404" />
              </Route>
              <Route exact path="/map" component={MapScreen} />
            </div>
          )}
        </Router>
      </div>
    );
  }
}

export default App;

/*<SearchScreen
  data={this.state.data2}
  startDate={this.state.Sdate}
  endDate={this.state.Edate}
  limitNumber={this.state.limit}
  typeAsset={this.state.type}
  orderType={this.state.order}
  activeDefault={0}
/>*/
