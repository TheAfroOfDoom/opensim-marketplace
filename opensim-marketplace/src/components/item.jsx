import React from "react";
import axios from "axios";
import Moment from "react-moment";
import ReactDOM from "react-dom";
import ReactCanvas from "@gfodor/react-canvas";

export default class itemPage extends React.Component {
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
    var Surface = ReactCanvas.Surface;
    var Image = ReactCanvas.Image;
    var Text = ReactCanvas.Text;
    var surfaceWidth = window.innerWidth;
    var surfaceHeight = window.innerHeight;
    if (this.state.data == null) {
      return <div />;
    } else {
      return (
        <div>
          <div>
            {this.state.data &&
              this.state.data.result.map((obj) => {
                return (
                  <div>
                    <h1>{obj.name}</h1>
                    <h3>{this.getAssetType(obj.assetType)}</h3>
                    <h6>
                      Create Time: {<Moment unix>{obj.create_time}</Moment>}
                    </h6>
                    <p>{this.state.dataString}</p>
                  </div>
                );
              })}
          </div>
          <img src={`data:image/png;base64,${this.state.dataString}`} />
        </div>
      );
    }
  }
}
