import React from "react";
import axios from "axios";
import Moment from "react-moment";
import "./ItemScreen.css";
import { Link } from "react-router-dom";
import _ from "lodash";

// Material UI Components
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

// Material UI Icons
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import NotInterestedIcon from "@material-ui/icons/NotInterested";

// Images
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

      var canvas = document.getElementById("myCanvas"); //get the canvas element (use whatever you actually need here!)
      canvas.width = response.data.imageInfo.width;
      canvas.height = response.data.imageInfo.height;
      var ctx = canvas.getContext("2d");

      var output = response.data.imageInfo.data;

      var image = ctx.getImageData(0, 0, canvas.width, canvas.height);
      var componentSize = canvas.width * canvas.height;
      for (var y = 0; y < canvas.height; y++) {
        for (var x = 0; x < canvas.width; x++) {
          var value = output[y * canvas.width + x];
          var base = (y * canvas.width + x) * 4;
          image.data[base + 0] =
            output[0 * componentSize + y * canvas.width + x];
          image.data[base + 1] =
            output[1 * componentSize + y * canvas.width + x];
          image.data[base + 2] =
            output[2 * componentSize + y * canvas.width + x];
          image.data[base + 3] = 255; //the alpha part..
        }
      }
      ctx.putImageData(image, 0, 0);
      /*
      ctx.moveTo(0, 0);
      ctx.lineTo(response.data.imageInfo.width, response.data.imageInfo.height);
      ctx.stroke();
      */
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

  render() {
    if (this.state.data == null) {
      return <div data-testid="items" />;
    } else {
      const { itemInfo, userInfo, invInfo, imageInfo } = this.state.data;
      console.log(itemInfo, userInfo, invInfo, imageInfo);
      return (
        <Container>
          <Grid container justify="center" direction="row">
            <Grid item container>
              <Grid
                container
                direction="column"
                justify="center"
                spacing={2}
                className="item-form"
              >
                <Paper className="item-background" elevation={5}>
                  <div className="item-container">
                    <div className="left-column">
                      {itemInfo.assetType === 0 ? (
                        <canvas
                          id="myCanvas"
                          width={imageInfo.width}
                          height={imageInfo.height}
                          style={{ border: "1px solid #000000" }}
                        ></canvas>
                      ) : (
                        <CardMedia
                          className="cover"
                          image="/Images/test.webp"
                        />
                      )}
                    </div>
                    <div className="right-column">
                      <div className="right-column-one">
                        <Typography component="h1" variant="h2" overline>
                          {itemInfo.name}
                        </Typography>
                        <Divider style={{ marginBottom: "30px" }} />
                        <Typography component="h4" variant="h5" gutterBottom>
                          {this.getAssetType(itemInfo.assetType).type}
                        </Typography>
                        <Typography
                          component="h5"
                          variant="subtitle"
                          gutterBottom
                        >
                          {itemInfo.description}
                        </Typography>
                        <Typography
                          component="h5"
                          variant="subtitle"
                          gutterBottom
                        >
                          {_.isEmpty(userInfo)
                            ? "Creator: Default Asset"
                            : `Creator: ${userInfo.FirstName} ${userInfo.LastName}`}
                        </Typography>

                        <Typography
                          component="h5"
                          variant="subtitle"
                          gutterBottom
                        >
                          Created:{" "}
                          {
                            <Moment format="MM/DD/YYYY HH:mm" unix>
                              {itemInfo.create_time}
                            </Moment>
                          }
                        </Typography>
                        <Typography
                          component="h5"
                          variant="subtitle"
                          gutterBottom
                        >
                          Modified:{" "}
                          {
                            <Moment format="MM/DD/YYYY HH:mm" unix>
                              {itemInfo.access_time}
                            </Moment>
                          }
                        </Typography>
                        <Divider style={{ marginBottom: "30px" }} />
                        {itemInfo.public === true ? (
                          <div>
                            <CheckCircleIcon style={{ float: "left" }} />
                            <Typography
                              component="h5"
                              variant="h5"
                              gutterBottom
                            >
                              Public
                            </Typography>
                          </div>
                        ) : (
                          <div>
                            <NotInterestedIcon style={{ float: "left" }} />
                            <Typography
                              component="h5"
                              variant="h5"
                              gutterBottom
                            >
                              Private
                            </Typography>
                          </div>
                        )}
                        {invInfo.inInventory === true ? (
                          <div>
                            <CheckCircleIcon style={{ float: "left" }} />
                            <Typography
                              component="h5"
                              variant="h5"
                              gutterBottom
                            >
                              In Inventory
                            </Typography>
                          </div>
                        ) : (
                          <div>
                            <NotInterestedIcon style={{ float: "left" }} />
                            <Typography
                              component="h5"
                              variant="h5"
                              gutterBottom
                            >
                              Not In Inventory
                            </Typography>
                          </div>
                        )}
                      </div>
                      <div className="right-column-two">
                        {!invInfo.inInventory ? (
                          <Link to={`/inventory#${itemInfo.name}`}>
                            <Button variant="outlined" onClick={this.handleAdd}>
                              Add to Inventory
                            </Button>
                          </Link>
                        ) : (
                          <Link to={`/inventory#${itemInfo.name}`}>
                            <Button variant="contained" color="primary">
                              View In Inventory
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <div>
            <image
              height={imageInfo.height}
              width={imageInfo.width}
              src={`data:image/jpg;base64,${imageInfo.data}`}
            />
          </div>
        </Container>
      );
    }
  }
}

/*

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
 */
