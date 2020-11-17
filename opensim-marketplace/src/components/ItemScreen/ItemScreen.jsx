import React from "react";
import axios from "axios";
import Moment from "react-moment";
import ReactDOM from "react-dom";
import {
  Nav,
  Form,
  FormControl,
  NavDropdown,
  Button,
  Image,
} from "react-bootstrap";
import "./ItemScreen.css";
import hey from "./Default.jpg";

import { HashLink as Link } from "react-router-hash-link";

export default class ItemScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null, dataString: "" };
  }

  async componentDidMount() {
    const response = await axios.get("/item", {
      params: {
        id: this.props.match.params.assetId,
        color: "green",
      },
    });

    this.setState({
      data: response.data,
    });
  }

  handleAdd = async () => {
    const response = await axios.get("/add", {
      params: {
        assetID: this.props.match.params.assetId,
      },
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
        info.pic = hey;
        break;
      case 0:
        info.type = "Texture in JPEG2000 J2C stream format";
        info.pic = hey;
        break;
      case 1:
        info.type = "Sound";
        info.pic = hey;
        break;
      case 2:
        info.type = "Calling Card";
        info.pic = hey;
        break;
      case 3:
        info.type = "Landmark";
        info.pic = hey;
        break;
      case 5:
        info.type = "Clothing";
        info.pic = hey;
        break;
      case 6:
        info.type = "itemInfoect";
        info.pic = hey;
        break;
      case 7:
        info.type = "Notecard";
        info.pic = hey;
        break;
      case 10:
        info.type = "LSLText (aka a script)";
        info.pic = hey;
        break;
      case 13:
        info.type = "Body Part";
        info.pic = hey;
        break;
      case 20:
        info.type = "Animation";
        info.pic = hey;
        break;
      case 21:
        info.type = "Gesture";
        info.pic = hey;
        break;
      case 49:
        info.type = "Mesh";
        info.pic = hey;
        break;
      default:
        info.type = "Invalid Type";
        info.pic = hey;
        break;
    }
    return info;
  };

  render() {
    if (this.state.data == null) {
      return <div />;
    } else {
      const { itemInfo } = this.state.data;
      const { userInfo } = this.state.data;
      const { invInfo } = this.state.data;
      console.log(invInfo.inInventory);
      return (
        <body className="page">
          <div>
            <div className="container">
              <div className="left-column">
                <Image src={this.getAssetType(itemInfo.assetType).pic} fluid />
              </div>

              <div className="right-column">
                <div className="asset-description">
                  <h1>{itemInfo.name}</h1>
                  <p>{this.getAssetType(itemInfo.assetType).type}</p>
                </div>
                <div className="user-description">
                  <h3>Creator Information</h3>
                  <p>Creator ID: {itemInfo.CreatorID}</p>
                  <p>Creator Name: {userInfo.FirstName} {userInfo.LastName}</p>
                  <p>Creator PrincipalID: {userInfo.PrincipalID}</p>
                  {this.state.dataString.substring(0, 10)}
                </div>
                <div className="asset-download">
                  <h3>Download & Details</h3>
                  <p>
                    Create Time: {<Moment unix>{itemInfo.create_time}</Moment>}
                  </p>
                  {console.log(invInfo.inInventory)}
                {!invInfo.inInventory ? (
                  <Link to={`/inventory#${itemInfo.name}`}>
                    <Button onClick={this.handleAdd}>Add To Inventory</Button>
                  </Link>
                ) : (
                  <Link to={`/inventory#${itemInfo.name}`}>
                    <Button onClick={this.handleAdd}>View In Inventory</Button>
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
