import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";

import "./HomeScreen.css";

let defaultImage = "/Default.jpg";
let categories = [
  { name: "Material", assetType: -2 },
  { name: "Texture", assetType: 0 },
  { name: "Sound", assetType: 1 },
  { name: "Calling Card", assetType: 2 },
  { name: "Landmark", assetType: 3 },
  { name: "Clothing", assetType: 5 },
  { name: "Object", assetType: 6 },
  { name: "Notecard", assetType: 7 },
  { name: "Script", assetType: 10 },
  { name: "Body Part", assetType: 13 },
  { name: "Gesture", assetType: 21 },
  { name: "Mesh", assetType: 49 },
];

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null, redirect: false };
  }

  searchRedirect = async (assetType) => {
    const response = await axios.get("/search", {
      params: { assetType: assetType },
    });
    console.log(response);
    this.props.searchData(response.data);
    this.setState({ redirect: true });
  };

  async componentDidMount() {
    const response = await axios.get("/search/public");
    console.log(response);
    this.setState({
      data: response.data,
    });
  }

  render() {
    return (
      <div>
        <div class="side">
          <h1 className="title">Categories</h1>
          {categories.map((obj) => {
            return (
              <button
                className="sideButton"
                onClick={this.searchRedirect.bind(this, obj.assetType)}
              >
                {obj.name}
              </button>
            );
          })}
        </div>
        {this.state.redirect ? <Redirect to="/search" /> : <div />}
      </div>
    );
  }
}
