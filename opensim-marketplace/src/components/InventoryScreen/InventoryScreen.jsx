import React from "react";

import "./InventoryScreen.css";

import { Spinner, Card, Button, Image } from "react-bootstrap";
import Cookies from "js-cookie";
import axios from "axios";
import { Link } from "react-router-dom";
import Moment from "react-moment";

let texture_default = "Images/Texture_Default.png";
let animation_default = "Images/Animation_Default.png";
let attachment_default = "Images/Attachment_Default.png";
let bodyparts_default = "Images/BodyParts_Default.png";
let callingcard_default = "Images/CallingCard_Default.png";
let cloths_default = "Images/Cloths_Default.png";
let gesture_default = "Images/Gesture_Default.png";
let landmark_default = "Images/Landmark_Default.png";
let material_default = "Images/Material_Default.png";
let mesh_default = "Images/Mesh_Default.png";
let notecard_default = "Images/NoteCard_Default.png";
let object_default = "Images/Object_Default.png";
let script_default = "Images/Script_Default.png";
let sound_default = "Images/Sound_Default.png";

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
  }

  getInventory = async () => {
    try {
      const response = await axios.get("/api/inventory");
      let test = response.data.sort((one, two) => {
        if (one.isCreator && !two.isCreator) {
          return -1;
        }
        if (!one.isCreator && two.isCreator) {
          return 1;
        } else return 0;
      });
      this.setState({ data: test });
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
      //console.log(assetID);
      const response = await axios.post("/api/inventory/upload", {
        assetID: assetID,
      });
      this.getInventory();
    } catch (error) {
      alert("Upload: " + error);
    }
  };

  privateItem = async (assetID) => {
    try {
      const response = await axios.post("/api/inventory/private", {
        assetID: assetID,
      });
      this.getInventory();
    } catch (error) {
      alert("Un-Upload: " + error);
    }
  };

  componentDidMount() {
    this.getInventory();
  }

  getAssetType = (assetType) => {
    let info = {
      type: "",
      pic: "",
    };
    switch (assetType) {
      case -2:
        info.type = "Material";
        info.pic = material_default;
        break;
      case 0:
        info.type = "Texture";
        info.pic = texture_default;
        break;
      case 1:
        info.type = "Sound";
        info.pic = sound_default;
        break;
      case 2:
        info.type = "Calling Card";
        info.pic = callingcard_default;
        break;
      case 3:
        info.type = "Landmark";
        info.pic = landmark_default;
        break;
      case 5:
        info.type = "Clothing";
        info.pic = cloths_default;
        break;
      case 6:
        info.type = "Object";
        info.pic = object_default;
        break;
      case 7:
        info.type = "Notecard";
        info.pic = notecard_default;
        break;
      case 10:
        info.type = "LSLText (aka a script)";
        info.pic = script_default;
        break;
      case 13:
        info.type = "Body Part";
        info.pic = bodyparts_default;
        break;
      case 20:
        info.type = "Animation";
        info.pic = animation_default;
        break;
      case 21:
        info.type = "Gesture";
        info.pic = gesture_default;
        break;
      case 49:
        info.type = "Mesh";
        info.pic = mesh_default;
        break;
      default:
        info.type = "Invalid Type";
        info.pic = attachment_default;
        break;
    }
    return info;
  };

  isPublic = (obj) => {
    if (obj.assets[0].public && obj.isCreator) {
      return true;
    }
    if (!obj.assets[0].public && obj.isCreator) {
      return false;
    }
  };

  render() {
    if (this.state.data == null) {
      return (
        <div>
          <Spinner data-testid="spin" id="spin" />
        </div>
      );
    } else {
      return (
        <div className="InventoryContainer">
          {this.state.data.map((obj) => {
            return (
              <div
                id={`${obj.InventoryName.replace("Default ", "")}`}
                key={obj.assetID}
              >
                <Card bsPrefix="main-card">
                  <Card.Header className="main-header">
                    {obj.InventoryName} {obj.isCreator ? <i>(creator)</i> : ""}
                  </Card.Header>
                  <Card.Body as="h6">
                    <div className="main-block">
                    <div className="image-column">
                      <Image
                        className="inventory-picture"
                        src={this.getAssetType(obj.assetType).pic}

                      ></Image>
                    </div>
                      <div className="text-column">
                        <Card.Text>
                          Asset Type: {this.getAssetType(obj.assetType).type}
                        </Card.Text>
                        <Card.Text>
                          Create Time:{" "}
                          {
                            <Moment format="MM/DD/YYYY HH:mm" unix>
                              {obj.creationDate}
                            </Moment>
                          }
                        </Card.Text>
                        <div className="inventory-button-group">
                          <Link to={`/item/${obj.assetID}`}>
                            <Button variant="info">Inspect Item</Button>
                          </Link>

                          <Button
                            variant="danger"
                            onClick={this.removeItem.bind(this, obj.assetID)}
                          >
                            Remove
                          </Button>

                          {obj.isCreator ? (
                            this.isPublic(obj) ? (
                              <Button
                                onClick={this.privateItem
                                  .bind(this, obj.assetID)
                                  .bind(this, obj.creatorID)}
                              >
                                Make Private
                              </Button>
                            ) : (
                              <Button
                                variant="success"
                                onClick={this.uploadItem.bind(
                                  this,
                                  obj.assetID
                                )}
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
            );
          })}
        </div>
      );
    }
  }
}
