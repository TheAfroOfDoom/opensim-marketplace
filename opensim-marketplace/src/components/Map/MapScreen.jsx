import React from "react";
import axios from "axios";
import Tile from "./Tile";
import "./MapScreen.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  MapConsumer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import TextFieldMui from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import {
  Container,
  Grid,
  Paper,
  Typography,
  List,
  Divider,
  Drawer,
  Button,
  FormControl,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import L from "leaflet";
import RegionInformation from "./RegionInformation";

const styles = {};

const styles_textfield = (muiTheme) => ({
  label: {
    "&$erroredLabel": {
      color: "white",
    },
  },
  erroredLabel: {},
  underline: {
    "&$error:after": {
      borderBottomColor: "white",
    },
  },
  error: {},
});

const TextField = withStyles(styles_textfield)(function TextField({
  classes,
  ...props
}) {
  return (
    <TextFieldMui
      InputLabelProps={{
        classes: {
          root: classes.label,
          focused: classes.focusedLabel,
          error: classes.erroredLabel,
        },
      }}
      InputProps={{
        classes: {
          root: classes.underline,
          error: classes.error,
        },
      }}
      {...props}
    />
  );
});

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPos: { lat: 1.9519996643066406, lng: 1.9540023803710938 }, //[1000, 1000]
      zoom: 17,
      map: null,
      input_x: null,
      input_y: null,
      cOpen: false,
      cAll: false,
      cancelShutdown: false,
      message: "",
      data: null,
      createOpen: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  async componentDidMount() {
    try {
      const response = await axios.get("/api/wifi/region/get");
      console.log(response);
      this.setState({
        data: response.data,
      });
    } catch (e) {
      console.error(e);
    }
  }
  confirmationOpen = () => {
    this.setState(() => ({
      cOpen: !this.state.cOpen,
    }));
  };
  confirmationCancel = () => {
    this.setState(() => ({
      cancelShutdown: !this.state.cancelShutdown,
    }));
  };
  confirmationAll = () => {
    this.setState(() => ({
      cAll: !this.state.cAll,
    }));
  };
  txtChange = (e) => {
    console.log(e.target.value);
    this.setState({
      message: e.target.value,
    });
  };
  handleShutdown = (name) => {
    this.setState({ regionName: name });
    this.confirmationOpen();
  };
  handleShutdownAll = (event) => {
    event.preventDefault();
    this.confirmationAll();
  };
  handleCancel = (event) => {
    event.preventDefault();
    this.confirmationCancel();
  };
  handleClick(e) {
    this.setState({ currentPos: e.latlng });
    //console.log(e);
  }

  handleZoom(map) {
    //ZOOM OUT
    if (this.state.zoom > map.getZoom()) {
      this.setState({ zoom: map.getZoom() });
      console.log("Zoomed Out");
      map.panTo(new L.LatLng(map.getCenter().lat * 2, map.getCenter().lng * 2));
    }
    //ZOOM IN
    if (this.state.zoom < map.getZoom()) {
      this.setState({ zoom: map.getZoom() });
      console.log("Zoomed In");
      map.panTo(new L.LatLng(map.getCenter().lat / 2, map.getCenter().lng / 2));
    }
  }

  handleMapActions(map) {
    this.setState({ map });
    map.on("zoomend", () => {
      this.handleZoom(map);
    });

    map.on("moveend", () => {
      //console.log(map.getCenter().toString());
      this.setState({ currentPos: map.getCenter() });
      console.log(map.getCenter());
    });
  }

  centerMap = (map) => {
    if (map) {
      map.panTo(this.latlongToTile(1000, 1000));
    }
  };

  handleCoordChange(axis, coord) {
    console.log("coord: ", coord);

    if (axis === 0) {
      this.setState({ input_x: coord });
    }
    if (axis === 1) {
      this.setState({ input_y: coord });
    }
  }

  handleCoordSubmit = (event) => {
    event.preventDefault();
    const { map } = this.state;
    if (map && this.state.input_x != null && this.state.input_y != null) {
      this.panOnMap(
        this.latlongToTile(
          this.state.input_x * Math.pow(2, 17 - this.state.zoom),
          this.state.input_y * Math.pow(2, 17 - this.state.zoom)
        )
      );
    }
  };

  panFromRegion = (locX, locY) => {
    const { map } = this.state;
    this.panOnMap(
      this.latlongToTile(
        locX * Math.pow(2, 17 - this.state.zoom),
        locY * Math.pow(2, 17 - this.state.zoom)
      )
    );
  };

  panOnMap = (newCoords) => {
    const { map } = this.state;
    map.panTo(newCoords);
  };

  latlongToTile(lat, long) {
    return [lat * 0.000976 * 2, long * 0.000977 * 2];
  }

  tileTolatlong({ lat, lng }) {
    let truelat = Math.round(
      (lat * (1 / (0.000976 * 2))) / Math.pow(2, 17 - this.state.zoom)
    );
    let truelng = Math.round(
      (lat * (1 / (0.000977 * 2))) / Math.pow(2, 17 - this.state.zoom)
    );
    return `(${truelat} ,${Math.trunc(truelng)})`;
  }
  CreateRegionPopup = () => {
    return (
      <Dialog
        open={this.state.createOpen}
        onClose={() => this.setState({ createOpen: !this.state.createOpen })}
        fullWidth={false}
        maxWidth="xs"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const name = event.target[0].value;
            const port = event.target[1].value;
            const vport = event.target[3].value;
            const folderName = event.target[2].value;
            const gridIP = event.target[4].value;
            const delay = event.target[5].value;
            axios.post("/api/wifi/region/create", {
              name,
              port,
              vport,
              folderName,
              gridIP,
              delay,
            });
            this.setState({ createOpen: false });
          }}
        >
          <DialogTitle id="alert-dialog-title">Create New Region</DialogTitle>
          <DialogContent>
            <DialogContentText>Enter the Region Name</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Region Name"
              fullWidth
              required
            />
          </DialogContent>
          <DialogContent>
            <DialogContentText>
              Enter the port the region will be on
            </DialogContentText>
            <TextField
              margin="dense"
              id="port"
              label="Port"
              type="number"
              fullWidth
              required
            />
          </DialogContent>
          <DialogContent>
            <DialogContentText>
              Enter the Region Folder the region will be on
            </DialogContentText>
            <TextField
              margin="dense"
              id="regionFolder"
              label="Region Folder"
              fullWidth
              required
            />
          </DialogContent>
          <DialogContent>
            <DialogContentText>
              Enter the Voice port the region will be on
            </DialogContentText>
            <TextField
              margin="dense"
              id="name"
              label="VPort"
              type="number"
              fullWidth
              required
            />
          </DialogContent>
          <DialogContent>
            <DialogContentText>
              Enter the IP Address the region will be on
            </DialogContentText>
            <TextField
              margin="dense"
              id="ip"
              label="IP Address"
              fullWidth
              required
            />
          </DialogContent>
          <DialogContent>
            <DialogContentText>Enter the Delay</DialogContentText>
            <TextField
              margin="dense"
              id="delay"
              label="Delay"
              type="number"
              fullWidth
              required
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                this.setState({ createOpen: false });
              }}
              color="primary"
            >
              Cancel
            </Button>
            <Button onClick={() => {}} color="primary" type="submit">
              Confirm
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="divcontainer">
        <div className="ccontainer" data-testid="map">
          <MapContainer
            style={{ top: 50 }}
            data-testid="map"
            center={this.latlongToTile(1000, 1000)}
            scrollWheelZoom={false}
            zoom={17}
            maxZoom={17}
            minZoom={14}
            crs={L.CRS.Simple}
            whenCreated={(map) => {
              this.handleMapActions(map);
            }}
          >
            <TileLayer
              //attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="http://25.5.144.194:8002/map-{z}-{x}{y}-objects.jpg"
              zoomReverse={true}
              tileSize={256}
            />
            <div className="leaflet-control-container">
              <div className="leaflet-top leaflet-right">
                <Paper className="coords-pane leaflet-control">
                  <Typography component="h5" variant="h5">
                    Current Location
                  </Typography>
                  <Typography component="p" variant="p">
                    {this.state.currentPos &&
                      this.tileTolatlong(this.state.currentPos)}
                  </Typography>
                </Paper>
              </div>
            </div>
          </MapContainer>
        </div>
        <div>
          <Drawer variant="persistent" anchor="left" open={true}>
            <List>
              <div className="title">
                <Typography variant="h6" gutterBottom>
                  Coordinate Control
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Current Location{" "}
                  {this.state.currentPos &&
                    this.tileTolatlong(this.state.currentPos)}
                </Typography>
                <form onSubmit={this.handleCoordSubmit}>
                  <div className="coordright">
                    <TextField
                      error={{}}
                      label="X Coordinate"
                      type="number"
                      onChange={(event) => {
                        const { value } = event.target;
                        this.handleCoordChange(0, value);
                      }}
                    />
                  </div>
                  <div className="coordleft">
                    <TextField
                      error={{}}
                      label="Y Coordinate"
                      type="number"
                      onChange={(event) => {
                        const { value } = event.target;
                        this.handleCoordChange(1, value);
                      }}
                    />
                  </div>
                  <Button type="submit">Move To</Button>
                </form>

                <Divider />
                <Typography variant="h6" gutterBottom>
                  Regions
                </Typography>
                {this.state.data !== null ? (
                  <RegionInformation
                    data={this.state.data}
                    pan={this.panFromRegion}
                    shutdown={this.handleShutdown}
                  />
                ) : (
                  <div />
                )}

                <div>
                  <Dialog
                    open={this.state.cOpen}
                    onClose={this.confirmationOpen}
                    fullWidth={false}
                    maxWidth="s"
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <form onSubmit={this.handleShutdown}>
                      <DialogTitle id="alert-dialog-title">
                        {`Are You Sure You Want To Shutdown ${this.state.regionName}?`}
                      </DialogTitle>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Message to online users:"
                        fullWidth
                        onChange={this.txtChange}
                        value={this.state.message}
                      />
                      <DialogActions>
                        <Button
                          onClick={this.confirmationOpen}
                          variant="danger"
                        >
                          Cancel
                        </Button>

                        <Button type="submit">Shutdown</Button>
                      </DialogActions>
                    </form>
                  </Dialog>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={this.confirmationAll}
                    className="button"
                  >
                    Shut Down All Regions
                  </Button>

                  <Dialog
                    open={this.state.cAll}
                    onClose={this.confirmationAll}
                    fullWidth={false}
                    maxWidth="s"
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Are You Sure You Want To Shutdown All Regions?"}
                    </DialogTitle>
                    <form onSubmit={this.handleShutdownAll}>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Message to online users:"
                        fullWidth
                        onChange={this.txtChange}
                        value={this.state.message}
                      />
                      <DialogActions>
                        <Button onClick={this.confirmationAll} variant="danger">
                          Cancel
                        </Button>

                        <Button type="submit">Shutdown</Button>
                      </DialogActions>
                    </form>
                  </Dialog>
                </div>
                {this.CreateRegionPopup()}
              </div>
              <div className="title">
                <Button className="button" onClick={this.handleCancel}>
                  Cancel Shutdown
                </Button>
                <Dialog
                  open={this.state.cancelShutdown}
                  onClose={this.state.cancelShutdown}
                  fullWidth={false}
                  maxWidth="s"
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to cancel the timed shutdown?"}
                  </DialogTitle>
                  <DialogActions>
                    <Button
                      onClick={this.confirmationCancel}
                      variant="danger"
                      alignItems="left"
                    >
                      Cancel
                    </Button>

                    <Button type="submit">Stop Shutdown</Button>
                  </DialogActions>
                </Dialog>
              </div>
              <div className="title">
                <Button
                  variant="contained"
                  color="primary"
                  className="button"
                  onClick={() => {
                    this.setState({ createOpen: true });
                  }}
                >
                  Create new Region
                </Button>
              </div>
            </List>
          </Drawer>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Map);
