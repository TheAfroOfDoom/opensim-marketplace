import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import axios from "axios";
///import { Card, Button } from "react-bootstrap";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#02394a",
    color: "#fff",
    display: "flex",
    flexDirection: "row",
    marginTop: "10px",
    marginBottom: "10px",
    minHeight: 150,
  },
  details: {
    display: "flex",
    flex: 3,
    flexDirection: "column",
  },
  content: {
    flex: 1,
  },
  cover: {
    maxWidth: "150px",
    flex: 1,
    marginLeft: 5,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  itemButton: {
    right: 0,
    color: "#fff",
    backgroundColor: " #ff8e32",
    alignSelf: "flex-end",
    marginBottom: "auto",
  },
  actionsContainer: {
    flex: 1,
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  imgProps: {
    minWidth: "256px",
    minHeight: "256px",
  },
}));

export default function CCard(props) {
  const sClass = useStyles();

  let loadImage = () => {
    return <CardMedia className={sClass.imgProps} image="/Images/test.webp" />;
  };

  const [imgData, setImgData] = useState(null);

  useEffect(() => {
    let fetchData = async (id) => {
      try {
        let response = await axios.get("/api/media/get", {
          params: { assetID: id },
        });
        setImgData(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData(props.obj.id);
  }, []);

  return (
    <div style={{ margin: "auto" }}>
      <Card className={sClass.root}>
        <div className={sClass.content}>
          <CardContent>
            <Link
              to={`/item/${props.obj.id}`}
              className={sClass.cover}
              style={{ textDecoration: "none", color: "#ffff" }}
            >
              <Typography component="h5" variant="h5">
                {props.obj.name}
              </Typography>
              {imgData === null ? (
                <CardMedia
                  className={sClass.imgProps}
                  image="/Images/test.webp"
                />
              ) : (
                <CardMedia className={sClass.imgProps} image={imgData.data} />
              )}
            </Link>

            <Typography variant="subtitle1">
              Creator:{" "}
              {props.obj.useraccount ? props.obj.useraccount.FirstName : "None"}{" "}
              {props.obj.useraccount ? props.obj.useraccount.LastName : "None"}
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
        <div className={sClass.actionsContainer}>
          <CardActions>
            <Link to={`/item/${props.obj.id}`}>
              <Button className={sClass.itemButton} variant="outlined">
                Item Page
              </Button>
            </Link>
          </CardActions>
        </div>
      </Card>
    </div>
  );
}
