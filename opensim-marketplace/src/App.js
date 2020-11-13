//Import React
import React from "react";

//Import CSS
import "./App.css";

//Import NPM Packages
import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Cookies from "js-cookie";
import Jumbotron from "react-bootstrap/Jumbotron";
import axios from "axios";

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
    this.state = { data: null, data2: null, loginStatus: null};
  }

  handleSearchChange = (data) => {
    this.setState({ data2: data });

  };

  checkStatus = () =>{
    if(Cookies.get('uuid') == undefined){
      return(<Redirect to="/login"></Redirect>);
    }else{
      console.log(Cookies.get('uuid'));
    }
  };

  setStatus = () => {
    this.setState({ loginStatus: Cookies.get('uuid')});
  };
  render() {


    return (
      <div className="App">
        <Router>
          <NavigationBar searchData={this.handleSearchChange} />
          {
            this.checkStatus()
          }
          <Switch>
            <Route path="/login" component={LoginScreen} />
            <Route path="/inventory" component={InventoryScreen} />
            <Route path="/search">
              <SearchScreen data={this.state.data2} activeDefault={0} />
            </Route>
            <Route exact path="/item/:assetId" component={ItemScreen} />
            <Route exact path="/" component={HomeScreen}></Route>
          </Switch>
        </Router>


      </div>
    );
  }
}

export default App;
