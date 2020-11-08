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
import hey from './Default.jpg';

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
      type:"",
      pic:""
    };
    switch (assetType) {
      case -2:
        info.type = "Material";
        info.pic = "https://upload.wikimedia.org/wikipedia/en/c/c2/Peter_Griffin.png";
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
        info.type = "Object";
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
      return (
        <body className="page">
          <div>
            {this.state.data &&
              this.state.data.map((obj) => {
                return (
                  <div className="container">

                    <div className="left-column">
                      <Image

                        src={this.getAssetType(obj.assetType).pic}
                        fluid
                      />
                    </div>

                    <div className="right-column">
                      <div className="asset-description">
                        <h1>{obj.name}</h1>
                        <p>{this.getAssetType(obj.assetType).type}</p>
                      </div>
                      <div className="user-description">
                        <h3>User info maybe</h3>
                        <p>User Name{this.state.dataString.substring(0, 10)}</p>
                        <p>About User</p>
                      </div>
                      <div className="asset-download">
                        <h3>Download & Details</h3>
                        <p>
                          Create Time: {<Moment unix>{obj.create_time}</Moment>}
                        </p>
                        <Link to={`/inventory#${obj.name}`}>
                          <Button onClick={this.handleAdd}>
                            Add To Inventory
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </body>
      );
    }
  }
}
//<img className="image" src={`data:image/png;base64,${this.state.dataString}`} />
