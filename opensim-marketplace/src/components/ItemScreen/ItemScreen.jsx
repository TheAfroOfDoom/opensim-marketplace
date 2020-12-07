import React from "react";
import axios from "axios";
import Moment from "react-moment";

import { Button, Image } from "react-bootstrap";
import "./ItemScreen.css";
import { Link } from "react-router-dom";

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

export default class ItemScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null, dataString: "" };
  }

  async componentDidMount() {
    console.log("Hey::");
    let error;
    try {
      const response = await axios
        .get("/api/item", {
          params: {
            id: this.props.match.params.assetId,
          },
        })
        .catch((err) => {
          if (err.response.status === 401) {
            throw new Error(`${err.config.url} Unauthorized`);
          }
          if (err.response.status === 400) {
            throw new Error(`${err.config.url} not found:2`);
          }
          throw err;
        });

      this.setState({
        data: response.data,
      });
    } catch (err) {
      error = err;
      console.log(error.message);
    }
  }

  handleAdd = async () => {
    const response = await axios.post("/api/inventory/add", {
      assetID: this.props.match.params.assetId,
    });
  };

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
        info.type = "Texture in JPEG2000 J2C stream format";
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

  render() {
    if (this.state.data == null) {
      return <div data-testid="items" />;
    } else {
      const { itemInfo } = this.state.data;
      const { userInfo } = this.state.data;
      const { invInfo } = this.state.data;
      console.log(invInfo.inInventory);
      return (
        <body className="page">
          <div>
            <img />
            <div className="container">
              <div className="left-column">
                <Image
                  data-testid="itemss"
                  src={this.getAssetType(itemInfo.assetType).pic}
                  fluid
                />
              </div>

              <div className="right-column">
                <div className="asset-description">
                  <h1>{itemInfo.name}</h1>
                  <p>{this.getAssetType(itemInfo.assetType).type}</p>
                </div>
                <div className="user-description">
                  <h3>Creator Information</h3>
                  <p>First Name: {userInfo.FirstName}</p>
                  <p>Last Name: {userInfo.LastName}</p>
                </div>
                <div className="asset-download">
                  <h3>Download & Details</h3>
                  <p>
                    Create Time:{" "}
                    {
                      <Moment format="MM/DD/YYYY HH:mm" unix>
                        {itemInfo.create_time}
                      </Moment>
                    }
                  </p>
                  {console.log(invInfo.inInventory)}
                  {!invInfo.inInventory ? (
                    <Link to={`/inventory#${itemInfo.name}`}>
                      <Button onClick={this.handleAdd}>Add To Inventory</Button>
                    </Link>
                  ) : (
                    <Link to={`/inventory#${itemInfo.name}`}>
                      <Button>View In Inventory</Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </body>
      );
    }
  }
}
