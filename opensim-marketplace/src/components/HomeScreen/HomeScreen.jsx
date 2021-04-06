import React, { useState, useEffect } from "react";

//Import Components
import { Jumbotron, Carousel } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import { Container, Grid } from "@material-ui/core";

//Import Custom Components
import CCard from "./CCard";

//Import Services
import axios from "axios";

//Import CSS
import "./HomeScreen.css";

//Constants
const NUMBER_OF_CAROUSELS = 2;
const CARDS_PER_CAROUSEL = 8;
const CATEGORIES = [
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

export default function HomeScreen(props) {
  const [data, setData] = useState({});
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(true);

  const searchRedirect = (assetType) => {
    props.searchData("", 0, assetType, "", undefined, undefined);
    setRedirect(true);
  };

  // Fetch data and store it in state
  const fetchData = async () => {
    try {
      const response = await axios.get("/api/search/public", {
        params: {
          limit: NUMBER_OF_CAROUSELS * CARDS_PER_CAROUSEL,
          order: "ACCESS_DESC",
        },
      });
      setData(response.data);
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  // After initially loading, fetch the data from the db
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="progress-container">
        <CircularProgress />
      </div>
    );
  } else if (redirect) {
    return <Redirect data-testid="Redirect" to="/search" />;
  } else {
    let dataarr = data.data;

    // Split the data into chunks for each carousel to be shown
    let carousels = [];
    for (let i = 0, j = dataarr.length; i < j; i += CARDS_PER_CAROUSEL) {
      carousels.push(dataarr.slice(i, i + CARDS_PER_CAROUSEL));
    }

    return (
      <div>
        <Jumbotron className="jumbo">
          <h1>Welcome</h1>
          <h3>To the Naval Undersea Warfare Center's Asset Marketplace</h3>
        </Jumbotron>
        <div className="side">
          <h1 className="title">Search Categories</h1>
          <div className="c">
            {CATEGORIES.map((obj) => {
              return (
                <button
                  className="sideButton"
                  onClick={searchRedirect.bind(this, obj.assetType)}
                >
                  {obj.name}
                </button>
              );
            })}
          </div>
        </div>
        <div className="item">
          <h1 className="itemTitle">Recently Updated Items</h1>

          <Carousel className="carousel-slide">
            {carousels.map((sub) => {
              return (
                <Carousel.Item>
                  <Container
                    maxWidth={false}
                    style={{ marginTop: "30px", marginBottom: "30px" }}
                  >
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      spacing={3}
                    >
                      {sub &&
                        sub.slice(0, CARDS_PER_CAROUSEL).map((obj, index) => {
                          return (
                            <Grid item xs={12} md={6} lg={4} xl={3}>
                              <CCard obj={obj} categories={CATEGORIES} />
                            </Grid>
                          );
                        })}
                    </Grid>
                  </Container>
                </Carousel.Item>
              );
            })}
          </Carousel>
        </div>
      </div>
    );
  }
}
