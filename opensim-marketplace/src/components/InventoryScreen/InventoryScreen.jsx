import React from "react";

import "./InventoryScreen.css";

import { Spinner, Card, Button } from "react-bootstrap";
import Cookies from "js-cookie";
import axios from "axios";
import { Link } from "react-router-dom";
import Moment from "react-moment";

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
      const response = await axios.post("/api/inventory/remove", {
        assetID: assetID,
      });
      this.getInventory();
    } catch (error) {
      alert("Remove: " + error);
    }
  };

  uploadItem = async (assetID) => {
    try {
      const response = await axios.post("/api/inventory/upload", {
        assetID: assetID,
      });
      this.getInventory();
    } catch (error) {
      alert("Upload: " + error);
    }
  };

  componentDidMount() {
    this.getInventory();
  };

  getAssetType = (assetType) => {
    let info = {
      type: "",
      //pic: "",
    };
    switch (assetType) {
      case -2:
        info.type = "Material";
        //info.pic = hey;
        break;
      case 0:
        info.type = "Texture in JPEG2000 J2C stream format";
        //info.pic = hey;
        break;
      case 1:
        info.type = "Sound";
        //info.pic = hey;
        break;
      case 2:
        info.type = "Calling Card";
        //info.pic = hey;
        break;
      case 3:
        info.type = "Landmark";
        //info.pic = hey;
        break;
      case 5:
        info.type = "Clothing";
        //info.pic = hey;
        break;
      case 6:
        info.type = "itemInfoect";
        //info.pic = hey;
        break;
      case 7:
        info.type = "Notecard";
        //info.pic = hey;
        break;
      case 10:
        info.type = "LSLText (aka a script)";
        //info.pic = hey;
        break;
      case 13:
        info.type = "Body Part";
        //info.pic = hey;
        break;
      case 20:
        info.type = "Animation";
        //info.pic = hey;
        break;
      case 21:
        info.type = "Gesture";
        //info.pic = hey;
        break;
      case 49:
        info.type = "Mesh";
        //info.pic = hey;
        break;
      default:
        info.type = "Invalid Type";
        //info.pic = hey;
        break;
      }
      return info;
    };

  isCreator = (obj) => {
    if(obj.creatorID === Cookies.get("uuid")){
      return(true);
    }else{
      return(false);
    }
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
                    <Card.Text>Asset Type: {this.getAssetType(obj.assetType).type}</Card.Text>
                    <Card.Text>Create Time:{" "}
                    {
                      <Moment format="MM/DD/YYYY HH:mm" unix>
                        {obj.creationDate}
                      </Moment>
                    }
                    </Card.Text>
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
                  {this.isCreator(obj) ? <Button onClick={this.uploadItem.bind(this, obj.assetID)}>Upload</Button> : <div />}
                </Card>
              </div>
            );
          })}
        </div>
      );
    }
  }
}
