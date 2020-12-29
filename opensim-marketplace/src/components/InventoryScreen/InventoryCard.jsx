import React from "react";

import "./InventoryCard.css";

import Cookies from "js-cookie";
import axios from "axios";
import { Link } from "react-router-dom";
import Moment from "react-moment";

import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";

export default function InventoryCard(props) {
  console.log(props.data);
  return (
    <Card
      className="root"
      elevation={10}
      id={`${props.data.InventoryName.replace("Default ", "")}`}
    >
      <Link to={`/item/${props.data.assetID}`} className="image-cover">
        <CardMedia image="/Images/test.webp" className="image" />
      </Link>
      <div className="details">
        <Typography component="h2" variant="h3">
          {props.data.InventoryName}
        </Typography>
        <Divider className="divider" />
        <Typography component="h2" variant="h5">
          {props.assetType.type}
        </Typography>
        <Typography component="h2" variant="h5" gutterBottom>
          Created:{" "}
          {
            <Moment format="MM/DD/YYYY HH:mm" unix>
              {props.data.creationDate}
            </Moment>
          }
        </Typography>
        <div className="actions-container">
          <CardActions>
            <Link to={`/item/${props.data.assetID}`}>
              <Button
                className="view-button"
                variant="contained"
                color="primary"
              >
                View Item
              </Button>
            </Link>
            <Button
              className="view-button"
              variant="contained"
              color="secondary"
              onClick={() => props.remove(props.data.assetID)}
            >
              Remove
            </Button>

            {props.data.isCreator ? (
              props.isPublic(props.data) ? (
                <Button
                  className="view-button"
                  variant="outlined"
                  color="secondary"
                  onClick={() => props.private(props.data.assetID)}
                >
                  Make Private
                </Button>
              ) : (
                <Button
                  className="view-button"
                  variant="outlined"
                  color="primary"
                  onClick={() => props.upload(props.data.assetID)}
                >
                  Make Public
                </Button>
              )
            ) : (
              <div />
            )}
          </CardActions>
        </div>
      </div>
    </Card>
  );
}

/*

<div
  id={`${props.obj.InventoryName.replace("Default ", "")}`}
  key={props.obj.assetID}
>
  <Card bsPrefix="main-card">
    <Card.Header className="main-header">
      {props.obj.InventoryName}{" "}
      {props.obj.isCreator ? <i>(creator)</i> : ""}
    </Card.Header>
    <Card.Body as="h6">
      <div className="main-block">
        <div className="image-column">
          <Image
            className="inventory-picture"
            src={props.assetType.pic}
          ></Image>
        </div>
        <div className="text-column">
          <Card.Text>Asset Type: {props.assetType.type}</Card.Text>
          <Card.Text>
            Create Time:{" "}
            {
              <Moment format="MM/DD/YYYY HH:mm" unix>
                {props.obj.creationDate}
              </Moment>
            }
          </Card.Text>
          <div className="inventory-button-group">
            <Link to={`/item/${props.obj.assetID}`}>
              <Button variant="info">Inspect Item</Button>
            </Link>

            <Button
              variant="danger"
              onClick={this.removeItem.bind(this, props.obj.assetID)}
            >
              Remove
            </Button>

            {props.obj.isCreator ? (
              this.isPublic(props.obj) ? (
                <Button
                  onClick={this.privateItem
                    .bind(this, props.obj.assetID)
                    .bind(this, props.obj.creatorID)}
                >
                  Make Private
                </Button>
              ) : (
                <Button
                  variant="success"
                  onClick={this.uploadItem.bind(this, props.obj.assetID)}
                >
                  Make Public
                </Button>
              )
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </Card.Body>
  </Card>
</div>
 */
