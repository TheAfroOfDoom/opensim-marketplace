import React, { useEffect, useState } from "react";

import "./InventoryCard.css";

import axios from "axios";
import { Link } from "react-router-dom";
import Moment from "react-moment";

import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Menu,
  MenuItem,
  Tabs,
  Tab,
} from "@material-ui/core";

//Icons
import IconButton from "@material-ui/core/IconButton";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import GetAppIcon from "@material-ui/icons/GetApp";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import MoreVertIcon from "@material-ui/icons/MoreVert";

export default function InventoryCard(props) {
  const [imgData, setImgData] = useState(null);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const MenuOpen = Boolean(anchorEl);

  useEffect(() => {
    let fetchData = async (id) => {
      try {
        //console.log(id);
        let response = await axios.get("/api/media/get", {
          params: { assetID: id },
        });
        //console.log(response);
        setImgData(response.data.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData(props.data.assetID);
  }, []);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleRemove = () => {
    handleMenuClose();
    setOpen(!open);
  };
  const handleEdit = () => {
    handleMenuClose();
    setEdit(!edit);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDownload = async (event) => {
    handleMenuClose();
    event.preventDefault();
    console.log(event);
    const res = await axios({
      method: "get",
      url: "/api/inventory/download",
      responseType: "blob",
      params: {
        inventorypath: props.inventorypath,
        assetID: props.data.assetID,
        inventoryName: props.data.InventoryName,
        isFile: true,
      },
      headers: {},
    });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${props.data.InventoryName}.iar`);
    link.click();
  };

  return (
    <Card
      className="root"
      elevation={10}
      id={`${props.data.InventoryName.replace("Default ", "")}`}
      style={{ paddingLeft: "16px" }}
    >
      <FormControlLabel
        aria-label="export-checkbox"
        control={<Checkbox />}
        value={`${props.data.inventoryID},`}
        onChange={async (event) => {
          await props.handleCheckClick(event);
        }}
      />
      <Link to={`/item/${props.data.assetID}`} className="image-cover">
        {imgData === null ? (
          <CardMedia className="image" image="/Images/test.webp" />
        ) : (
          <CardMedia className="image" image={imgData.data} />
        )}
      </Link>
      <div className="details">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography component="h2" variant="h3">
            {props.data.InventoryName}
          </Typography>
          <div style={{ marginTop: "auto", marginBottom: "auto" }}>
            {props.data.isCreator ? (
              props.data.assets[0].public && props.data.isCreator ? (
                <LockOpenIcon />
              ) : (
                <LockIcon />
              )
            ) : (
              <div />
            )}
          </div>
        </div>
        <Divider className="divider" />
        <Typography component="h2" variant="h5">
          {props.assetType.type}
        </Typography>
        <Typography component="h2" variant="h5" gutterBottom>
          Created:{" "}
          {
            <Moment format="MM/DD/YYYY HH:mm" unix>
              {props.data.creationDate}
            </Moment>
          }
        </Typography>

        {EditAsset(props, edit, setEdit)}
        {RemoveAssetPopup(props, open, setOpen)}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Link to={`/item/${props.data.assetID}`}>
              <Button
                className="view-button"
                variant="contained"
                color="primary"
                style={{ marginRight: "10px" }}
              >
                View Item
              </Button>
            </Link>
            {props.data.isCreator ? (
              props.data.assets[0].public && props.data.isCreator ? (
                <Button
                  className="market-button"
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    props.private(props.data.assetID, props.data.InventoryName);
                  }}
                >
                  Make Private
                </Button>
              ) : (
                <Button
                  className="market-button"
                  variant="outlined"
                  color="primary"
                  onClick={() =>
                    props.upload(props.data.assetID, props.data.InventoryName)
                  }
                >
                  Make Public
                </Button>
              )
            ) : (
              <div />
            )}
          </div>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleMenuClick}
          >
            <MoreVertIcon />
          </IconButton>
        </div>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={MenuOpen}
          onClose={handleMenuClose}
          PaperProps={{
            style: {
              maxHeight: 48 * 4.5,
              width: "20ch",
            },
          }}
        >
          {props.data.isCreator ? (
            <MenuItem onClick={handleEdit}>
              <EditIcon style={{ marginRight: "5px" }} />
              Edit
            </MenuItem>
          ) : (
            <div />
          )}
          <MenuItem onClick={handleRemove}>
            <DeleteIcon style={{ marginRight: "5px" }} />
            Remove
          </MenuItem>
          <MenuItem onClick={handleDownload}>
            <GetAppIcon style={{ marginRight: "5px" }} />
            Download
          </MenuItem>
        </Menu>
      </div>
    </Card>
  );
}

function EditAsset(props, edit, setEdit) {
  const [image, setImage] = useState(null);
  const [imgObj, setImageObj] = useState(null);
  const [name, setName] = useState(props.data.InventoryName);
  const [value, setValue] = React.useState(0);
  const [tags, setTags] = useState(null);

  const handleimagefile = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  };

  const onImageLoad = ({ target: img }) => {
    console.log(img.naturalHeight, img.naturalWidth, img);
    let canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    setImageObj({
      width: img.naturalWidth,
      height: img.naturalHeight,
      data: canvas.toDataURL("image/jpeg"),
    });
    console.log(canvas.toDataURL("image/jpeg").toString());
  };

  const fetchData = async (id) => {
    try {
      //console.log(id);
      let response = await axios.get("/api/inventory/tags/get", {
        params: { assetID: id },
      });
      console.log(response.data);
      setTags(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (edit && value === 1) fetchData(props.data.assetID);
  }, [edit, value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Dialog
      open={edit}
      onClose={() => setEdit(!edit)}
      fullWidth={true}
      maxWidth="md"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      style={{ minHeight: "300px" }}
    >
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab label="General" />
        <Tab label="Tags" />
      </Tabs>
      <div hidden={value !== 0}>
        <DialogTitle id="alert-dialog-title">{"Edit Asset"}</DialogTitle>
        <DialogContent>
          <DialogContentText>Change Name</DialogContentText>
          <TextField
            label=""
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <DialogContentText style={{ marginTop: "10px" }}>
            Change Image
          </DialogContentText>
          <input
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
            onChange={handleimagefile}
          />
          <img onLoad={onImageLoad} src={image} />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setEdit(!edit)}
            variant="contained"
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              props.image(props.data.assetID, imgObj, name);
              setEdit(!edit);
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </div>
      <div
        hidden={value !== 1}
        style={{
          minHeight: 200,
        }}
      >
        <DialogTitle id="alert-dialog-title">Edit Tags</DialogTitle>
        <DialogContent>
          <DialogContentText style={{ marginTop: "10px" }}>
            Enter the name of the tag and press submit
          </DialogContentText>
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              const newTag = event.target[0].value;
              event.target[0].value = "";
              console.log(newTag);
              try {
                let response = await axios.post("/api/inventory/tags/set", {
                  assetID: props.data.assetID,
                  newTag,
                });
                fetchData(props.data.assetID);
              } catch (e) {
                console.log("Error: " + e.message);
              }
            }}
          >
            <div>
              <TextField autoFocus margin="dense" id="tag" label="New Tag" />
              <Button type="submit" style={{ marginTop: 16 }}>
                Submit
              </Button>
            </div>
          </form>
          <Divider style={{ marginTop: 15 }} />
          <DialogContentText style={{ marginTop: "10px" }}>
            Tags
          </DialogContentText>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              marginBottom: 30,
            }}
          >
            {tags &&
              tags.map((tag) => {
                return <TagBlock name={tag} />;
              })}
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
}

function TagBlock(props) {
  return (
    <div
      style={{
        backgroundColor: "#DCDCDC",
        height: "100%",
        margin: "5px 10px 5px 10px",
        padding: "5px 0px 5px 10px",
        borderRadius: 10,
      }}
    >
      {props.name}
      <IconButton style={{ marginLeft: 5 }}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </div>
  );
}

function RemoveAssetPopup(props, open, setOpen) {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(!open)}
      fullWidth={false}
      maxWidth="xs"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Are You Sure You Want To Remove This Item?"}
      </DialogTitle>
      <DialogActions>
        <Button
          onClick={() => setOpen(!open)}
          variant="contained"
          color="secondary"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            props.remove(props.data.assetID, props.data.InventoryName);
            setOpen(!open);
          }}
          variant="contained"
        >
          Remove
        </Button>
      </DialogActions>
    </Dialog>
  );
}
