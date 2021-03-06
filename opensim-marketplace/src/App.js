//Import React
import React, { useState, useEffect } from "react";

//Import CSS
import "./App.css";

//Import NPM Packages
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";

//Import Custom Components
import LoginScreen from "./components/LoginScreen/LoginScreen";
import Routes from "./Routes";

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
          <Routes
            hl={handleLogin}
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
          />
        )}
      </Router>
    </div>
  );
}

export default App;
