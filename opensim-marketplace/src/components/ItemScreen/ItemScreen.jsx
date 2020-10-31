import React from "react";
import axios from "axios";
import Moment from "react-moment";
import ReactDOM from "react-dom";
import { Nav, Form, FormControl, NavDropdown, Button } from "react-bootstrap";
import "./ItemScreen.css";
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
        });
        //this.props.searchData(response.data);
      });
  }

  getAssetType = (assetType) => {
    let stuff = {
      type:"",
      pic:""
    };
    switch (assetType) {
      case -2:
        stuff.type = "Material";
        stuff.pic = "https://upload.wikimedia.org/wikipedia/en/c/c2/Peter_Griffin.png";
        break;
      case 0:
        stuff.type = "Texture in JPEG2000 J2C stream format";
        stuff.pic = "https://upload.wikimedia.org/wikipedia/en/a/a5/Lois_Griffin.png";
        break;
      case 1:
        //result = "Sound";
        //pic = "https://upload.wikimedia.org/wikipedia/en/0/02/Stewie_Griffin.png";
        stuff.type = "Sound";
        stuff.pic = "https://upload.wikimedia.org/wikipedia/en/a/a5/Lois_Griffin.png";
        break;
      case 2:
        //result = "Calling Card";
        //pic = "https://kangsblackbeltacademy.com/wp-content/uploads/2017/04/default-image-720x530.jpg";
        stuff.type = "Calling Card";
        stuff.pic = "https://upload.wikimedia.org/wikipedia/en/a/a5/Lois_Griffin.png";
        break;
      case 3:
        //result = "Landmark";
        //pic = "https://kangsblackbeltacademy.com/wp-content/uploads/2017/04/default-image-720x530.jpg";
        stuff.type = "Landmark";
        stuff.pic = "https://upload.wikimedia.org/wikipedia/en/a/a5/Lois_Griffin.png";
        break;
      case 5:
        //result = "Clothing";
        //pic = "https://kangsblackbeltacademy.com/wp-content/uploads/2017/04/default-image-720x530.jpg";
        stuff.type = "Clothing";
        stuff.pic = "https://upload.wikimedia.org/wikipedia/en/a/a5/Lois_Griffin.png";
        break;
      case 6:
        //result = "Object";
        //pic = "https://kangsblackbeltacademy.com/wp-content/uploads/2017/04/default-image-720x530.jpg";
        stuff.type = "Object";
        stuff.pic = "https://upload.wikimedia.org/wikipedia/en/a/a5/Lois_Griffin.png";
        break;
      case 7:
        //result = "Notecard";
        //pic = "https://kangsblackbeltacademy.com/wp-content/uploads/2017/04/default-image-720x530.jpg";
        stuff.type = "Notecard";
        stuff.pic = "https://upload.wikimedia.org/wikipedia/en/0/02/Stewie_Griffin.png";
        break;
      case 10:
        //result = "LSLText (aka a script)";
        //pic = "https://kangsblackbeltacademy.com/wp-content/uploads/2017/04/default-image-720x530.jpg";
        stuff.type = "LSLText (aka a script)";
        stuff.pic = "https://upload.wikimedia.org/wikipedia/en/a/a5/Lois_Griffin.png";
        break;
      case 13:
        //result = "Body Part";
        //pic = "https://kangsblackbeltacademy.com/wp-content/uploads/2017/04/default-image-720x530.jpg";
        stuff.type = "Body Part";
        stuff.pic = "https://upload.wikimedia.org/wikipedia/en/a/a5/Lois_Griffin.png";
        break;
      case 20:
        //result = "Animation";
        //pic = "https://kangsblackbeltacademy.com/wp-content/uploads/2017/04/default-image-720x530.jpg";
        stuff.type = "Animation";
        stuff.pic = "https://upload.wikimedia.org/wikipedia/en/a/a5/Lois_Griffin.png";
        break;
      case 21:
        //result = "Gesture";
        //pic = "https://kangsblackbeltacademy.com/wp-content/uploads/2017/04/default-image-720x530.jpg";
        stuff.type = "Gesture";
        stuff.pic = "https://upload.wikimedia.org/wikipedia/en/a/a5/Lois_Griffin.png";
        break;
      case 49:
        //result = "Mesh";
        //pic = "https://kangsblackbeltacademy.com/wp-content/uploads/2017/04/default-image-720x530.jpg";
        stuff.type = "Mesh";
        stuff.pic = "https://upload.wikimedia.org/wikipedia/en/a/a5/Lois_Griffin.png";
        break;
      default:
        //result = "Invalid Type";
        //pic = "https://kangsblackbeltacademy.com/wp-content/uploads/2017/04/default-image-720x530.jpg";
        stuff.type = "Invalid Type";
        stuff.pic = "https://kangsblackbeltacademy.com/wp-content/uploads/2017/04/default-image-720x530.jpg";
        break;
    }
    return stuff;
  };

  render() {
    //var Surface = ReactCanvas.Surface;
    //var Image = ReactCanvas.Image;
    //var Text = ReactCanvas.Text;
    //var surfaceWidth = window.innerWidth;
    //var surfaceHeight = window.innerHeight;
    if (this.state.data == null ){

      return <div />;
    } else {
      return (
        <body className="page">
          <div>
            {this.state.data &&
              this.state.data.map((obj) => {
                return (
                  <body>
                    <h1 className="title">{obj.name}</h1>

                    <img
                      className="image"
                      src={this.getAssetType(obj.assetType).pic}
                    />
                    <div className="infoBox">
                      <h3>Description</h3>
                      <p>{this.getAssetType(obj.assetType).type}</p>
                    </div>
                    <div className="infoBox">
                      <h3>User Details</h3>
                      <p>A bunch of junk</p>
                    </div>
                    <div className="infoBox">
                      <h3>Download & Details</h3>
                      <p>
                        Create Time: {<Moment unix>{obj.create_time}</Moment>}
                      </p>
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
