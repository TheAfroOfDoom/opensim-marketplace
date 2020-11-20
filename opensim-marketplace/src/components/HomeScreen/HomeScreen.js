import React from "react";
import axios from "axios";
import { Jumbotron, Card, Carousel } from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";
import Moment from "react-moment";

import "./HomeScreen.css";

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
    let dataarr = this.state.data;
    let sorted = null;
    if (dataarr != null) {
      sorted = dataarr.splice(0, 8).sort((first, second) => {
        if (first.create_time < second.create_time) return 1;
        if (first.create_time > second.create_time) return -1;
        else return 0;
      });
    }

    return (
      <div>
        <div>
          <Jumbotron className="jumbo">
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
          <Carousel>
            <Carousel.Item>
              <div className="grid-container">
                {sorted &&
                  sorted.slice(0, 8).map((obj, index) => {
                    return (
                      <div style={{ margin: "1rem" }}>
                        <Card bsPrefix="cards">
                          <Card.Header>
                            <Link to={`/item/${obj.id}`}>
                              <Card.Title border="dark" className="text-item">
                                {obj.name}
                              </Card.Title>
                            </Link>
                          </Card.Header>
                          <Card.Body className="body">
                            <h3>
                              Creator:{" "}
                              {obj.useraccount
                                ? obj.useraccount.FirstName
                                : "None"}{" "}
                              {obj.useraccount
                                ? obj.useraccount.LastName
                                : "None"}
                            </h3>
                            <p>
                              Asset Type:{" "}
                              {
                                categories.find(
                                  (element) =>
                                    element.assetType === obj.assetType
                                ).name
                              }
                            </p>
                            <p>
                              {obj.description !== ""
                                ? obj.description
                                : "No Description"}{" "}
                            </p>
                            <p>
                              <Moment format="MM/DD/YYYY HH:mm" unix>
                                {obj.create_time}
                              </Moment>
                            </p>
                          </Card.Body>
                        </Card>
                      </div>
                    );
                  })}
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="grid-container">
                {sorted &&
                  sorted.slice(6, 11).map((obj, index) => {
                    return (
                      <div style={{ margin: "1rem" }}>
                        <Card bsPrefix="cards">
                          <Card.Header>
                            <Link to={`/item/${obj.id}`}>
                              <Card.Title border="dark" className="text-item">
                                {obj.name}
                              </Card.Title>
                            </Link>
                          </Card.Header>
                          <Card.Body className="body">
                            <h3>
                              Creator:{" "}
                              {obj.useraccount
                                ? obj.useraccount.FirstName
                                : "None"}{" "}
                              {obj.useraccount
                                ? obj.useraccount.LastName
                                : "None"}
                            </h3>
                            <p>
                              Asset Type:{" "}
                              {
                                categories.find(
                                  (element) =>
                                    element.assetType === obj.assetType
                                ).name
                              }
                            </p>
                            <p>
                              {obj.description !== ""
                                ? obj.description
                                : "No Description"}{" "}
                            </p>
                            <p>
                              <Moment format="MM/DD/YYYY HH:mm" unix>
                                {obj.create_time}
                              </Moment>
                            </p>
                          </Card.Body>
                        </Card>
                      </div>
                    );
                  })}
              </div>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    );
  }
}
