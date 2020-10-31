//Import React
import React from "react";

//Import CSS
import "./App.css";

//Import NPM Packages
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";

//Import Custom Components
import NavigationBar from "./components/Navbar/Navbar";
import ItemScreen from "./components/ItemScreen/ItemScreen";
import SearchScreen from "./components/Search/SearchScreen";
import LoginScreen from "./components/LoginScreen/LoginScreen";

class App extends React.Component {
  constructor() {
    super();
    this.state = { data: null, data2: null };
  }

  getsqldata = () => {
    axios.get("/test").then((response) => {
      console.log(response.data);
    });
  };

  handleSearchChange = (data) => {
    this.setState({ data2: data });
  };

  render() {
    return (
      <div className="App">
        <Router>
          <NavigationBar searchData={this.handleSearchChange} />
          <Route path="/login" component={LoginScreen} />
          <Route exact path="/">
            <div>
              <button onClick={this.getsqldata}>Get table</button>
            </div>
          </Route>
          <Route path="/search">
            <SearchScreen data={this.state.data2} />
          </Route>
          <Route path="/item/:assetId" component={ItemScreen} />
        </Router>
      </div>
    );
  }
}

export default App;
