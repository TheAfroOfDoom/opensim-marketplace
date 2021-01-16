import React from "react";
import axios from "axios";
import { Jumbotron, Carousel } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import CCard from "./CCard";
import { CircularProgress } from "@material-ui/core";
import { Container, Grid } from "@material-ui/core";

//import CCarousel from "./CCarousel";
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
    try {
      const response = await axios.get("/api/search/public", {
        params: { assetType: assetType },
      });
      console.log(response);
      this.props.searchData(response.data);
      this.setState({ redirect: true });
    } catch (err) {
      console.log(err.message);
    }
  };

  async componentDidMount() {
    try {
      const response = await axios.get("/api/search/public", { limit: 16 });
      console.log(response);
      this.setState({
        data: response.data.data,
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
      console.log(dataarr);
      sorted = dataarr.splice(0, 17).sort((first, second) => {
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
        <div className="side">
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
        {this.state.redirect ? (
          <Redirect data-testid="Redirect" to="/search" />
        ) : (
          <div />
        )}
        <div className="item">
          <h1 className="itemTitle">Recently Updated Items</h1>
          <Carousel className="carousel-slide">
            <Carousel.Item>
              <Container
                maxWidth={false}
                style={{ marginTop: "30px", marginBottom: "30px" }}
              >
                <Grid container direction="row" alignItems="center" spacing={3}>
                  {sorted &&
                    sorted.slice(0, 8).map((obj, index) => {
                      return (
                        <Grid item xs={12} md={6} lg={4} xl={3}>
                          <CCard obj={obj} categories={categories} />
                        </Grid>
                      );
                    })}
                </Grid>
              </Container>
            </Carousel.Item>
            <Carousel.Item>
              <Container
                maxWidth={false}
                style={{ marginBottom: "30px", marginTop: "30px" }}
              >
                <Grid container direction="row" alignItems="center" spacing={3}>
                  {sorted &&
                    sorted.slice(9, 17).map((obj, index) => {
                      return (
                        <Grid item xs={12} md={6} lg={4} xl={3}>
                          <CCard obj={obj} categories={categories} />
                        </Grid>
                      );
                    })}
                </Grid>
              </Container>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    );
  }
}
