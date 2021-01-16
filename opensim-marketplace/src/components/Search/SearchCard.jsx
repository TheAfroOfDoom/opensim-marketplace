import React, { useState, useEffect } from "react";
//Import Material Components
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
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
    marginLeft: 5,
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
}));

export default function SearchCard(props) {
  useEffect(() => {
    if (
      props.obj.assetType === 0 &&
      props.obj.data !== undefined &&
      !("Error" in props.obj.data)
    ) {
      console.log(props.obj.data);
      var canvas = document.getElementById(`myCanvas${props.index}`); //get the canvas element (use whatever you actually need here!)
      canvas.width = props.obj.data.width;
      canvas.height = props.obj.data.height;
      var ctx = canvas.getContext("2d");

      var output = props.obj.data.data;

      //  console.log(props.obj.name);
      //  console.table([props.obj.data.width, props.obj.data.height]);

      var image = ctx.getImageData(0, 0, canvas.width, canvas.height);
      var componentSize = canvas.width * canvas.height;
      for (var y = 0; y < canvas.height; y++) {
        for (var x = 0; x < canvas.width; x++) {
          var value = output[y * canvas.width + x];
          var base = (y * canvas.width + x) * 4;
          image.data[base + 0] =
            output[0 * componentSize + y * canvas.width + x];
          image.data[base + 1] =
            output[1 * componentSize + y * canvas.width + x];
          image.data[base + 2] =
            output[2 * componentSize + y * canvas.width + x];
          image.data[base + 3] = 255; //the alpha part..
        }
      }
      ctx.putImageData(image, 0, 0);
    }
  });

  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card className={classes.root} elevation={10}>
      <Link to={`/item/${props.obj.id}`} className={classes.cover}>
        <CardMedia image="" />
        {props.obj.assetType === 0 && props.obj.data !== undefined ? (
          <canvas
            id={`myCanvas${props.index}`}
            width={props.obj.data.width}
            height={props.obj.data.height}
            className="cover"
          ></canvas>
        ) : (
          <CardMedia className="cover" image="/Images/test.webp" />
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

/*
<Card bsPrefix="new-custom">
  <Card.Header>
    <Link to={`/item/${props.obj.id}`}>
      <Card.Title border="dark" className="text-item">
        {props.obj.name}
      </Card.Title>
    </Link>
  </Card.Header>
  <Card.Body className="body">
    <Card.Text>Asset Type: {props.assetType}</Card.Text>
    <Card.Text>
      Create Time:{" "}
      {
        <Moment format="MM/DD/YYYY HH:mm" unix>
          {props.obj.create_time}
        </Moment>
      }
    </Card.Text>
    <Link to={`/item/${props.obj.id}`}>
      <Button>More Info</Button>
    </Link>
  </Card.Body>
</Card>
 */
