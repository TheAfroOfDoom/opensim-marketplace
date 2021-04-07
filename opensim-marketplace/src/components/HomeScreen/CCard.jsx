import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import axios from "axios";
///import { Card, Button } from "react-bootstrap";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import "./CCard.css";

export default function CCard(props) {
  const [imgData, setImgData] = useState(null);
  const [loading, setLoading] = useState(true);

  let fetchData = async () => {
    try {
      let response = await axios.get("/api/media/get", {
        params: { assetID: props.obj.id },
      });
      setImgData(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card className="ccard-root">
      <div className="content">
        <CardContent>
          <Link
            to={`/item/${props.obj.id}`}
            style={{ textDecoration: "none", color: "#ffff" }}
          >
            <Typography component="h5" variant="h5">
              {props.obj.name}
            </Typography>
            <Image imgData={imgData} loading={loading} />
          </Link>
          <Typography variant="subtitle1">
            Creator:{" "}
            {props.obj.useraccount
              ? props.obj.useraccount.FirstName
              : "Default"}{" "}
            {props.obj.useraccount ? props.obj.useraccount.LastName : "Asset"}
          </Typography>
          <Typography variant="subtitle1">
            Date Created:{" "}
            {
              <Moment format="MM/DD/YYYY HH:mm" unix>
                {props.obj.create_time}
              </Moment>
            }
          </Typography>
          <Typography variant="subtitle1">
            Asset Type:{" "}
            {
              props.categories.find(
                (element) => element.assetType === props.obj.assetType
              ).name
            }
          </Typography>
        </CardContent>
      </div>
      <div className="actions-container">
        <CardActions>
          <Link to={`/item/${props.obj.id}`}>
            <Button className="item-button" variant="outlined">
              Item Page
            </Button>
          </Link>
        </CardActions>
      </div>
    </Card>
  );
}

function Image({ imgData, loading }) {
  if (loading) {
    return (
      <div className="progress-container">
        <CircularProgress />
      </div>
    );
  }
  const source = imgData !== null ? imgData.data : "/Images/test.webp";
  return <CardMedia className="cover" image={source} />;
}
