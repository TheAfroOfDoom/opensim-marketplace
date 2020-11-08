//Import React
import React from "react";

//Import CSS
import "./App.css";

//Import NPM Packages
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Cookies from "js-cookie";

//Import Custom Components
import NavigationBar from "./components/Navbar/Navbar";
import ItemScreen from "./components/ItemScreen/ItemScreen";
import SearchScreen from "./components/Search/SearchScreen";
import LoginScreen from "./components/LoginScreen/LoginScreen";
import InventoryScreen from "./components/InventoryScreen/InventoryScreen";
import Home from "./components/Home/Home";

class App extends React.Component {
  constructor() {
    super();
    this.state = { data: null, data2: null, loginStatus: null};
  }

  handleSearchChange = (data) => {
    this.setState({ data2: data });
    console.log(Cookies.get());
  };

  checkStatus = () =>{
    console.log(Cookies.get('uuid'));
    if(Cookies.get('uuid') == undefined){
      return(undefined)
    }else{
      return(Cookies.get('uuid'))
    }
  };

  setStatus = () => {
    this.setState({ loginStatus: Cookies.get('uuid')});
  };
  render() {

    this.checkStatus();
    return (
      <div className="App">
        <Router>
          <NavigationBar searchData={this.handleSearchChange} />
          <Switch>
            <Route path="/login" component={LoginScreen} />
            <Route path="/inventory" component={InventoryScreen} />
            <Route path="/search">
              <SearchScreen data={this.state.data2} activeDefault={0} />
            </Route>
            <Route path="/item/:assetId" component={ItemScreen} />
            <Route exact path="/" component={Home} />
          </Switch>
        </Router>


      </div>
    );
  }
}

export default App;
