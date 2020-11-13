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

  getInventory = async () => {
    try {
      const response = await axios.get("/api/inventory");
      this.setState({ data: response.data });
    } catch (error) {
      alert("Get Inventory: " + error);
    }
  };
  removeItem = async (assetID) => {
    try {
      const response = await axios.get("/api/inventory/remove", {
        params: {
          assetID: assetID,
        },
      });
      this.getInventory();
    } catch (error) {
      alert("Remove: " + error);
    }
  };

  componentDidMount() {
    this.getInventory();
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
                      <Button variant="primary">Inspect Item</Button>
                    </Link>
                  </Card.Body>
                  <Button
                    variant="danger"
                    onClick={this.removeItem.bind(this, obj.assetID)}
                  >
                    Remove
                  </Button>
                </Card>
              </div>
            );
          })}
        </div>
      );
    }
  }
}
