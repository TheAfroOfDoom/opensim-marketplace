import React from "react";

import "./InventoryScreen.css";

import { Spinner } from "react-bootstrap";

import axios from "axios";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Snackbar from "@material-ui/core/Snackbar";
import Typography from "@material-ui/core/Typography";
import MuiAlert from "@material-ui/lab/Alert";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import InventoryCard from "./InventoryCard";

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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      setOpen: null,
      open: null,
      message: "",
      severity: "error",
    };
    this.chosenInventoryIDs = "";
    this.folderIDs = "";
  }

  handleCheckClick = async (event) => {
    //console.log(event.target);
    if (event.target.checked) {
      this.chosenInventoryIDs = this.chosenInventoryIDs + event.target.value;
    } else {
      this.chosenInventoryIDs = this.chosenInventoryIDs.replace(
        event.target.value,
        ""
      );
    }
    console.log("chosenInvIDs: " + this.chosenInventoryIDs);
  };

  getFolder = async () => {
    console.log("Folder retrieval started...");
    try {
      const response = await axios.get("/api/inventory/test");
      console.log(response.data);
      this.setState({ data: response.data });
    } catch (error) {
      alert("Get Folder: " + error);
    }
    console.log("Folder structure retreival completed.");
  };

  /**
  function constructFolders(folders, items, parentFolderID) {
    let localFolders = folders.filter(
      (folder) => folder.dataValues.parentFolderID === parentFolderID
    );
    localFolders.forEach((f) =>
      folders.splice(
        folders.findIndex(
          (e) => e.dataValues.parentFolderID === f.dataValues.parentFolderID
        ),
        1
      )
    );

    console.log(localFolders);

    for (let i = 0; i < localFolders.length; i++) {
      localFolders[i].dataValues["folders"] = constructFolders(
        folders,
        items,
        localFolders[i].dataValues.folderID
      );

      localFolders[i].dataValues["items"] = items.filter(
        (item) => item.dataValues.parentFolderID === parentFolderID
      );

      items.forEach((f) =>
        items.splice(
          items.findIndex(
            (e) => e.dataValues.parentFolderID === f.dataValues.parentFolderID
          ),
          1
        )
      );
    }
    return localFolders;
  }
  */
  getInventory = async () => {
    try {
      const response = await axios.get("/api/inventory");
      let test = response.data.sort((one, two) => {
        //console.log(response.data);
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

  removeItem = async (assetID, inventoryName) => {
    try {
      const response = await axios.post("/api/inventory/remove", {
        assetID: assetID,
      });
      this.getFolder();
      this.setState({
        open: true,
        message: `${inventoryName} is now removed`,
        severity: "success",
      });
    } catch (error) {
      //alert("Remove: " + error);
      this.setState({
        open: true,
        message: `Error removing ${inventoryName}`,
        severity: "error",
      });
    }
  };

  uploadItem = async (assetID, inventoryName) => {
    try {
      //console.log(assetID);
      const response = await axios.post("/api/inventory/upload", {
        assetID: assetID,
      });
      this.getFolder();
      this.setState({
        open: true,
        message: `${inventoryName} is now public`,
        severity: "success",
      });
    } catch (error) {
      //alert("Upload: " + error);
      this.setState({
        open: true,
        message: `Error making ${inventoryName} public`,
        severity: "error",
      });
    }
  };

  privateItem = async (assetID, inventoryName) => {
    try {
      const response = await axios.post("/api/inventory/private", {
        assetID: assetID,
      });
      this.getFolder();
      this.setState({
        open: true,
        message: `${inventoryName} is now private`,
        severity: "success",
      });
    } catch (error) {
      //alert("Un-Upload: " + error);
      this.setState({
        open: true,
        message: `Error making ${inventoryName} private`,
        severity: "error",
      });
    }
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

  isPublic = (obj) => {
    if (obj.assets[0].public && obj.isCreator) {
      return true;
    }
    if (!obj.assets[0].public && obj.isCreator) {
      return false;
    }
  };

  componentDidMount() {
    this.getFolder();
  }

  handleImageChange = async (assetId, imageOBJ, name) => {
    console.log("New Name" + name);
    try {
      //console.log(assetID);
      const response = await axios.post("/api/media/set", {
        assetID: assetId,
        imgData: imageOBJ,
      });
      this.getFolder();
      this.setState({
        open: true,
        message: `Asset Successfully edited`,
        severity: "success",
      });
    } catch (error) {
      //alert("Un-Upload: " + error);
      this.setState({
        open: true,
        message: `Error Saving Edit Changes to Asset please try again`,
        severity: "error",
      });
    }
  };

  handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  constructFolders = (data, inventorypath) => {
    let currentInventoryPath = inventorypath + data.folderName + "/";
    return (
      <Accordion key={data.folderID}>
        <Accordion style={{ marginLeft: "2.5%" }}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <div style={{ display: "inline-flex" }}>
              <FormControlLabel
                aria-label="export-checkbox"
                onClick={(event) => event.stopPropagation()}
                onFocus={(event) => event.stopPropagation()}
                control={<Checkbox />}
                onChange={(event) => {
                  console.log("peepee");
                  //this.setState({ test: 'sum string'})
                  /*
                  data.folders.map((obj) => {
                    obj.setState({checked: event.target.checked})
                  });
                  //*/
                  data.items.map((obj) => {
                    //obj.setState({checked: event.target.checked})
                    //console.log(obj);
                  });
                  //*/
                }}
              />
              <Typography component="h2" variant="h5">
                {currentInventoryPath}
              </Typography>
            </div>
          </AccordionSummary>
          {data.folders.map((obj) => {
            return this.constructFolders(obj, currentInventoryPath);
          })}
          {data.items.map((obj) => {
            return (
              <Container
                style={{ marginTop: 5, marginBottom: 5 }}
                key={obj.assetID}
              >
                <InventoryCard
                  data={obj}
                  assetType={this.getAssetType(obj.assetType)}
                  remove={this.removeItem.bind(this)}
                  private={this.privateItem.bind(this)}
                  upload={this.uploadItem.bind(this)}
                  handleCheckClick={this.handleCheckClick.bind(this)}
                  image={this.handleImageChange}
                  inventorypath={currentInventoryPath}
                />
              </Container>
            );
          })}
        </Accordion>
      </Accordion>
    );
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
        <div>
          <Snackbar
            open={this.state.open}
            autoHideDuration={6000}
            onClose={this.handleSnackClose}
          >
            <Alert
              onClose={this.handleSnackClose}
              severity={this.state.severity}
            >
              {this.state.message}
            </Alert>
          </Snackbar>
          <Container style={{ marginTop: "5%", marginBottom: "5%" }}>
            <Button
              className="view-button"
              variant="contained"
              color="primary"
              onClick={async () => {
                // If no assets are selected, dont call stuff
                if (!this.chosenInventoryIDs) {
                  this.setState({
                    open: true,
                    message: `No assets selected`,
                    severity: "warning",
                  });
                  return;
                }

                const res = await axios({
                  method: "get",
                  url: "/api/inventory/downloadMulti",
                  responseType: "blob",
                  params: {
                    rootFolderID: this.state.data.folderID,
                    folderIDs: this.folderIDs,
                    inventoryIDs: this.chosenInventoryIDs,
                    keepStructure: false,
                  },
                  headers: {},
                });
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", `multi.iar`);
                link.click();
              }}
            >
              Export Selected
            </Button>
            <Accordion
              style={{
                marginLeft: "2.5%",
                marginRight: "2.5%",
              }}
              expanded
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography component="h2" variant="h4">
                  {this.state.data.folderName}
                </Typography>
              </AccordionSummary>
              {this.state.data.folders.map((obj) => {
                return this.constructFolders(obj, "/");
              })}
              {this.state.data.items.map((obj) => {
                return (
                  <Container
                    style={{ marginTop: 5, marginBottom: 5 }}
                    key={obj.assetID}
                  >
                    <InventoryCard
                      data={obj}
                      assetType={this.getAssetType(obj.assetType)}
                      remove={this.removeItem.bind(this)}
                      private={this.privateItem.bind(this)}
                      upload={this.uploadItem.bind(this)}
                      handleCheckClick={this.handleCheckClick.bind(this)}
                      image={this.handleImageChange}
                      inventorypath={"/"}
                    />
                  </Container>
                );
              })}
            </Accordion>
          </Container>
        </div>
      );
    }
  }
}
/*
<Button
  variant="contained"
  color="primary"
  style={{ float: "left" }}
  onClick={async () => {
    const res = await axios({
      method: "get",
      url: "/api/inventory/download",
      responseType: "blob",
      params: {
        inventorypath: currentInventoryPath,
        isFile: false,
      },
      headers: {},
    });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${data.folderName}.iar`);
    link.click();
  }}
>
  Download
</Button>;
*/
