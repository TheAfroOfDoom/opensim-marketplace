import React from "react";
import "./App.css";
import NavigationBar from "./components/Navbar/Navbar";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ItemPage from "./components/item";

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
      <div>
        <Router>
          <NavigationBar searchData={this.handleSearchChange} />
          <Route exact path="/">
            <div className="App">
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
            <div className="grid-container">
              {this.state.data2 &&
                this.state.data2.map((obj) => {
                  return (
                    <div className="grid-item">
                      <Link to={`/item/${obj.id}`}>{obj.name}</Link>
                    </div>
                  );
                })}
            </div>
          </Route>
          <Route path="/item/:assetId" component={ItemPage} />
        </Router>
      </div>
    );
  }
}

export default App;
