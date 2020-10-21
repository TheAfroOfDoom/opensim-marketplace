import React from "react";
import "./App.css";
import NavigationBar from "./components/Navbar/Navbar";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class App extends React.Component {
  constructor() {
    super();
    this.state = { data: null, data2: null };
  }

  getsqldata = () => {
    axios.get("/test").then((response) => {
      console.log(response.data);
      this.setState({ data: response.data });
    });
  };

  handleSearchChange = (data) => {
    this.setState({ data2: data });
  };

  render() {
    return (
      <Router>
        <Route exact path="/">
          <div className="App">
            <NavigationBar searchData={this.handleSearchChange} />
            <button onClick={this.getsqldata}>Get table</button>
            <div>
              {this.state.data &&
                this.state.data.fields.map((obj) => {
                  return <h1>{obj.name}</h1>;
                })}
              {this.state.data &&
                this.state.data.result.map((obj) => {
                  return (
                    <h3>
                      {obj.Id} | {obj.value}
                    </h3>
                  );
                })}
            </div>
          </div>
        </Route>
        <Route path="/search">
          <NavigationBar searchData={this.handleSearchChange} />
          <div>
            {this.state.data2 &&
              this.state.data2.map((obj) => {
                return (
                  <div>
                    <h1>
                      {obj.name}, {obj.assetType}
                    </h1>
                  </div>
                );
              })}
          </div>
        </Route>
      </Router>
    );
  }
}

export default App;
