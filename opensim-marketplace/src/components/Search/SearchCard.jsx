import React from "react";

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
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image="/Images/test.webp"
        title="Live from space album cover"
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {props.obj.name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            {props.assetType}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            Create Time:{" "}
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
            <Button size="small" className={classes.viewButton}>
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
