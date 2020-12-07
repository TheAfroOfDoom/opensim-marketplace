import React from "react";
import axios from "axios";
import { Jumbotron, Carousel } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import CCard from "./CCard";

import "./HomeScreen.css";

/*
 Imports for necessary packages
 creates the categories array; contains the name of each asset and their Type
 for redirect in the search categories bar
*/
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
    const response = await axios.get("/api/search/public", {
      params: { assetType: assetType },
    });
    console.log(response);
    this.props.searchData(response.data);
    this.setState({ redirect: true });
  };

  async componentDidMount() {
    try {
      const response = await axios.get("/api/search/public");
      console.log(response);
      this.setState({
        data: response.data,
      });
    } catch (err) {
      console.log(err.message);
    }
  }
  /*
render function to display all items on home page
contains a welcome message,
search categories which search for assets by Type
and item carousel with recently updated items
*/
  render() {
    let dataarr = this.state.data;
    let sorted = null;
    if (dataarr != null) {
      sorted = dataarr.splice(0, 16).sort((first, second) => {
        if (first.create_time < second.create_time) return 1;
        if (first.create_time > second.create_time) return -1;
        else return 0;
      });
    }

    return (
      <div>
        <div>
          <Jumbotron className="jumbo" style={{ backgroundColor: "#02394a" }}>
            <div>
              <h1>Welcome</h1>
              <h3>To the Naval Undersea Warfare Center's Asset Marketplace</h3>
            </div>
          </Jumbotron>
        </div>
        <div class="side">
          <h1 className="title">Search Categories</h1>
          <div className="c">
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
        </div>
        {this.state.redirect ? <Redirect to="/search" /> : <div />}
        <div className="item">
          <h1 className="itemTitle">Recently Updated Items</h1>
          <Carousel className="carousel-slide">
            <Carousel.Item>
              <div className="grid-container">
                {sorted &&
                  sorted.slice(0, 8).map((obj, index) => {
                    return <CCard obj={obj} categories={categories} />;
                  })}
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="grid-container">
                {sorted &&
                  sorted.slice(9, 16).map((obj, index) => {
                    return <CCard obj={obj} categories={categories} />;
                  })}
              </div>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    );
  }
}
