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
    const response = await axios.get("/api/search", {
      params: { assetType: assetType },
    });
    console.log(response);
    this.props.searchData(response.data);
    this.setState({ redirect: true });
  };

  async componentDidMount() {
    const response = await axios.get("/api/search/public");
    console.log(response);
    this.setState({
      data: response.data,
    });
  }

  render() {
    return (
      <div>
        <div>
          <Carousel>
            {this.state.data &&
              this.state.data.map((obj) => {
                return (
                  <Carousel.Item
                    className="Carousel"
                    style={{ backgroundImage: `url(${defaultImage})` }}
                  >
                    <Carousel.Caption>
                      <h1>{obj.name}</h1>
                      <p>{obj.description}</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                );
              })}
          </Carousel>
        </div>
        <div class="side">
          <a>Search Categories</a>
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
