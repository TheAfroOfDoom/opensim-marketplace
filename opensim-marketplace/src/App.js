//Import React
import React, { useState, useEffect } from "react";

//Import CSS
import "./App.css";

//Import NPM Packages
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  useLocation,
} from "react-router-dom";
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

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cookies = Cookies.get();
    setLoggedIn(cookies.hasOwnProperty("sid"));
    setLoading(false);
  }, [loggedIn]);

  const handleLogin = (newValue) => {
    setLoggedIn(newValue);
  };

  const handlePageChange = () => {
    console.log("test");
  };

  if (loading) {
    return <div className="App" />;
  }

  return (
    <div className="App">
      <Router basename="marketplace">
        {!loggedIn ? (
          <div>
            <Route path="/login">
              <LoginScreen handleLogin={handleLogin} />
            </Route>
            <Redirect to="/login" />
          </div>
        ) : (
          <Routes hl={handleLogin} loggedIn={loggedIn} />
        )}
      </Router>
    </div>
  );
}

function Routes(props) {
  return (
    <div>
      <NavigationBar data={props.loggedIn} handleLogin={props.hl} />
      <Switch>
        <Route exact path="/login">
          <Redirect to="/" />
        </Route>
        <Route exact path="/" component={HomeScreen} />
        <Route path="/inventory" component={InventoryScreen} />
        <Route path="/search/" component={SearchScreen} />
        <Route path="/item/:assetId" component={ItemScreen} />
        <Route exact path="/map" component={MapScreen} />
        <Route component={ErrorScreen} />
      </Switch>
    </div>
  );
}

export default App;
