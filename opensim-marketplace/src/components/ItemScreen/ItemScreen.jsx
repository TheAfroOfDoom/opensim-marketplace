import React, { useState, useEffect } from "react";

// Import Components
import {
  Typography,
  Container,
  Grid,
  Paper,
  Divider,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import Moment from "react-moment";

// Material UI Icons
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import NotInterestedIcon from "@material-ui/icons/NotInterested";

// Import Services
import axios from "axios";
import _ from "lodash";

// Import CSS
import "./ItemScreen.css";

// Constants
const CATEGORIES = [
  { name: "Material", type: -2 },
  { name: "Texture", type: 0 },
  { name: "Sound", type: 1 },
  { name: "Calling Card", type: 2 },
  { name: "Landmark", type: 3 },
  { name: "Clothing", type: 5 },
  { name: "Object", type: 6 },
  { name: "Notecard", type: 7 },
  { name: "Script", type: 10 },
  { name: "Body Part", type: 13 },
  { name: "Gesture", type: 21 },
  { name: "Mesh", type: 49 },
];

export default function ItemScreen(props) {
  const { assetId } = props.match.params;

  const [data, setData] = useState({});
  const [imgData, setImgData] = useState({});
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch Asset and Image Data
  const fetchData = async () => {
    try {
      // Asset Data
      const response = await axios.get("/api/item", {
        params: {
          id: assetId,
        },
      });
      setData(response.data);

      // Image Data
      const imgResponse = await axios.get("/api/media/get", {
        params: {
          assetID: assetId,
        },
      });

      setImgData(imgResponse.data);
      setLoading(false);
    } catch (e) {
      console.error(e.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading || _.isEmpty(data) || _.isEmpty(imgData)) {
    return (
      <div data-testid="items" className="progress-container">
        <CircularProgress />
      </div>
    );
  } else if (redirect) {
    return <Redirect to={`/inventory`} />;
  } else {
    return (
      <Container>
        <Grid container justify="center" direction="row">
          <Grid item container>
            <Grid
              container
              direction="column"
              justify="center"
              spacing={2}
              className="item-form"
            >
              <Paper className="item-background" elevation={5}>
                <div className="item-container">
                  <LeftColumn imgData={imgData} />
                  <RightColumn
                    data={data}
                    assetId={assetId}
                    setRedirect={setRedirect}
                  />
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

function LeftColumn(props) {
  const { data } = props.imgData;
  const source = data !== null ? data.data : "/Images/test.webp";
  return (
    <div className="left-column">
      <img className="cover" src={source} />
    </div>
  );
}

function RightColumn(props) {
  console.log(props.data);

  const { itemInfo, userInfo, invInfo } = props.data;

  const handleAdd = async () => {
    await axios.post("/api/inventory/add", {
      assetID: props.assetId,
    });
    props.setRedirect(true);
  };

  const getAssetType = (assetType) => {
    return CATEGORIES.find((obj) => {
      return obj.type === assetType;
    });
  };

  return (
    <div className="right-column">
      <div className="right-column-one">
        <Title />
        <Details />
        <Availability />
      </div>
      <Actions />
    </div>
  );

  function Title() {
    return (
      <div>
        <Typography component="h1" variant="h2" overline>
          {itemInfo.name}
        </Typography>
        <Divider style={{ marginBottom: "30px" }} />
      </div>
    );
  }

  function Details() {
    return (
      <div>
        <Typography component="h4" variant="h5" gutterBottom>
          {getAssetType(itemInfo.assetType).name}
        </Typography>
        <Typography component="h5" variant="subtitle" gutterBottom>
          {itemInfo.description}
        </Typography>
        <Typography component="h5" variant="subtitle" gutterBottom>
          Creator: {`${userInfo.FirstName} ${userInfo.LastName}`}
        </Typography>

        <Typography component="h5" variant="subtitle" gutterBottom>
          Created:{" "}
          {
            <Moment format="MM/DD/YYYY HH:mm" unix>
              {itemInfo.create_time}
            </Moment>
          }
        </Typography>
        <Typography component="h5" variant="subtitle1" gutterBottom>
          Modified:{" "}
          {
            <Moment format="MM/DD/YYYY HH:mm" unix>
              {itemInfo.access_time}
            </Moment>
          }
        </Typography>
        <Divider style={{ marginBottom: "30px" }} />
      </div>
    );
  }

  function Availability() {
    console.log(itemInfo);
    return (
      <div>
        {itemInfo.public === 1 ? (
          <div>
            <CheckCircleIcon style={{ float: "left" }} />
            <Typography component="h5" variant="h5" gutterBottom>
              Public
            </Typography>
          </div>
        ) : (
          <div>
            <NotInterestedIcon style={{ float: "left" }} />
            <Typography component="h5" variant="h5" gutterBottom>
              Private
            </Typography>
          </div>
        )}
        {invInfo.inInventory === true ? (
          <div>
            <CheckCircleIcon style={{ float: "left" }} />
            <Typography component="h5" variant="h5" gutterBottom>
              In Inventory
            </Typography>
          </div>
        ) : (
          <div>
            <NotInterestedIcon style={{ float: "left" }} />
            <Typography component="h5" variant="h5" gutterBottom>
              Not In Inventory
            </Typography>
          </div>
        )}
      </div>
    );
  }

  function Actions() {
    return (
      <div className="right-column-two">
        {!invInfo.inInventory ? (
          <Button variant="outlined" onClick={handleAdd}>
            Add to Inventory
          </Button>
        ) : (
          <Link to={`/inventory#${itemInfo.name}`}>
            <Button variant="contained" color="primary">
              View In Inventory
            </Button>
          </Link>
        )}
      </div>
    );
  }
}
