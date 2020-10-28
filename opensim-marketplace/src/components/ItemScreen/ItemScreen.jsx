import React from "react";
import axios from "axios";
import Moment from "react-moment";
import ReactDOM from "react-dom";
import { Nav, Form, FormControl, NavDropdown, Button } from "react-bootstrap";
import "./ItemScreen.css"
//import ReactCanvas from "@gfodor/react-canvas";

export default class ItemScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null, dataString: "" };
  }

  componentDidMount() {
    axios
      .get("/item", {
        params: {
          id: this.props.match.params.assetId,
          color: "green",
        },
      })
      .then((response) => {
        console.log("Item Data: " + response);

        this.setState({
          data: response.data,
          dataString: response.data.endString,
        });
        //this.props.searchData(response.data);
      });
  }

  getAssetType = (assetType) => {
    let result = "";
    switch (assetType) {
      case -2:
        result = "Material";
        break;
      case 0:
        result = "Texture in JPEG2000 J2C stream format";
        break;
      case 1:
        result = "Sound";
        break;
      case 2:
        result = "Calling Card";
        break;
      case 3:
        result = "Landmark";
        break;
      case 5:
        result = "Clothing";
        break;
      case 6:
        result = "Object";
        break;
      case 7:
        result = "Notecard";
        break;
      case 10:
        result = "LSLText (aka a script)";
        break;
      case 13:
        result = "Body Part";
        break;
      case 20:
        result = "Animation";
        break;
      case 21:
        result = "Gesture";
        break;
      case 49:
        result = "Mesh";
        break;
      default:
        result = "Invalid Type";
        break;
    }
    return result;
  };

  render() {

    //var Surface = ReactCanvas.Surface;
    //var Image = ReactCanvas.Image;
    //var Text = ReactCanvas.Text;
    var surfaceWidth = window.innerWidth;
    var surfaceHeight = window.innerHeight;
    if (this.state.data == null) {
      return <div />;
    } else {
      return (
        <body className="page">
          <div>
            {this.state.data &&
              this.state.data.result.map((obj) => {
                return (
                  <body>
                    <h1 className="title">{obj.name}</h1>

                    <img className="image" src="https://kangsblackbeltacademy.com/wp-content/uploads/2017/04/default-image-720x530.jpg" />
                    <div className="infoBox">
                      <h3>Description</h3>
                      <p>{this.getAssetType(obj.assetType)}</p>
                    </div>
                    <div className="infoBox">
                      <h3>User Details</h3>
                      <p>A bunch of junk</p>
                    </div>
                    <div className="infoBox">
                      <h3>Download & Details</h3>
                      <p>Create Time: {<Moment unix>{obj.create_time}</Moment>}</p>
                      <p>{this.state.dataString.substring(0, 10)}</p>
                      <Button>Add To Inventory</Button>
                    </div>
                  </body>
                );
              })}
          </div>

        </body>
      );
    }
  }
}
//<img className="image" src={`data:image/png;base64,${this.state.dataString}`} />
