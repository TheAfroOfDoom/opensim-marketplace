import React from "react";
import "./App.css";
import NavigationBar from "./components/Navbar/Navbar";
import axios from "axios";

class App extends React.Component {
  constructor() {
    super();
    this.state = {data: null};
  }

  getsqldata = () => {
    axios.get("/test").then(response => {
      console.log(response.data);
      this.setState({data: response.data});
    });
  };

  render() {
    return (
      <div className="App">
        <NavigationBar />
        <button onClick={this.getsqldata}>Get table</button>
        <div>
          {this.state.data &&
            this.state.data.fields.map(obj => {
              return <h1>{obj.name}</h1>;
            })}
          {this.state.data &&
            this.state.data.result.map(obj => {
              return (
                <h3>
                  {obj.Id} | {obj.value}
                </h3>
              );
            })}
        </div>
      </div>
    );
  }
}

export default App;
