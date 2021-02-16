import React, { useState, useEffect } from "react";
import axios from "axios";
//Import Material Components
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

//Import Other Libraries
import Moment from "react-moment";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
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
    maxWidth: 150,
    flex: 1,
    margin: 5,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  viewButton: {
    right: 0,
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
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
}));

export default function SearchCard(props) {
  const [imgData, setImgData] = useState(null);

  useEffect(() => {
    let fetchData = async (id) => {
      try {
        console.log(id);
        let response = await axios.get("/api/media/get", {
          params: { assetID: id },
        });
        console.log(response);
        setImgData(response.data.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData(props.obj.id);
  }, []);

  const classes = useStyles();

  return (
    <Card className={classes.root} elevation={10}>
      <Link to={`/item/${props.obj.id}`} className={classes.cover}>
        {imgData === null ? (
          <CardMedia className={classes.imgProps} image="/Images/test.webp" />
        ) : (
          <CardMedia className={classes.imgProps} image={imgData.data} />
        )}
      </Link>

      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {props.obj.name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            {props.assetType}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            Created:{" "}
            {
              <Moment format="MM/DD/YYYY HH:mm" unix>
                {props.obj.create_time}
              </Moment>
            }
          </Typography>
        </CardContent>
      </div>
      <div className={classes.actionsContainer}>
        <CardActions>
          <Link to={`/item/${props.obj.id}`}>
            <Button className={classes.viewButton} variant="outlined">
              View Item
            </Button>
          </Link>
        </CardActions>
      </div>
    </Card>
  );
}
