//Import React
import React, { useState, useEffect } from "react";

// Import Reach Router & JS Cookie
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  useLocation,
  withRouter,
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

export default withRouter(function Routes(props) {
  const [currentPath, setCurrentPath] = useState(props.location.pathname);

  // Detect a change in the current page
  useEffect(() => {
    const { pathname } = props.location;
    console.log("New path:", pathname);
    setCurrentPath(pathname);

    //Check Cookie
    let cookies = Cookies.get();
    props.setLoggedIn(cookies.hasOwnProperty("sid"));
  }, [props.location.pathname]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
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
});
