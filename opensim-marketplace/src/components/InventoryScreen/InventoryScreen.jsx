import React from "react";

import "./InventoryScreen.css";

import { Spinner, Card, Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
  }

  componentDidMount() {
    axios.get("/inventory").then((response) => {
      this.setState({ data: response.data });
    });
  }

  render() {
    if (this.state.data == null) {
      return (
        <div>
          <Spinner />
        </div>
      );
    } else {
      return (
        <div className="InventoryContainer">
          {this.state.data.map((obj) => {
            return (
              <div id={`${obj.InventoryName.replace("Default ", "")}`}>
                <Card className="card">
                  <Card.Header as="h5">{obj.InventoryName}</Card.Header>
                  <Card.Body>
                    <Card.Text>Inventory Type: {obj.InvType}</Card.Text>
                    <Card.Text>Asset Type: {obj.assetType}</Card.Text>
                    <Link to={`/item/${obj.assetID}`}>
                      <Button variant="primary">Go somewhere</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
      );
    }
  }
}
