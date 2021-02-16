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
import { withStyles } from '@material-ui/core/styles';
import { Container, Grid, Paper, Typography, TextField, List, Divider, Drawer, Button, FormControl } from "@material-ui/core";
import L from "leaflet";

const styles = {
  paper: {
    background: "#343a40",
    height: 'calc(100% - 50px)',
    top: 60,
    width: "20%",
  },
  title: {
    color: "white",
    textAlign: "center",
  },
  coords: {
    display:"flex",
  },
  coordright: {
    paddingLeft: 10,
    paddingRight: 10,
    width: "50%",
    float:"left",
    //marginLeft: 10,
  },
  coordleft: {
    paddingLeft: 10,
    paddingRight: 10,
    width: "50%",
    float:"right",
    //marginLeft: 10,
  },
}

class map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPos: null,
      zoom: 17,
      map: null,
      input_x: null,
      input_y: null
    };
    this.handleClick = this.handleClick.bind(this);
  }

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
    });
  }

  centerMap = (map) =>{
    if(map){
      map.panTo(this.latlongToTile(1000,1000));
    }
  }

  handleCoordChange(axis, coord){
    console.log("coord: ", coord);

    if(axis === 0){
      this.setState({ input_x: coord});
    }
    if(axis === 1){
      this.setState({ input_y: coord});
    }
  }

  handleCoordSubmit = (map) => {
    if(map && this.state.input_x != null && this.state.input_y != null){
      map.panTo(this.latlongToTile(this.state.input_x, this.state.input_y));
    }
  }

  latlongToTile(lat, long) {
    return [lat * 0.000976 * 2, long * 0.000977 * 2];
  }

  tileTolatlong({ lat, lng }) {
    let truelat = Math.trunc(
      (lat * (1 / (0.000976 * 2))) / Math.pow(2, 17 - this.state.zoom)
    );
    let truelng = Math.trunc(
      (lat * (1 / (0.000977 * 2))) / Math.pow(2, 17 - this.state.zoom)
    );
    return `(${truelat} ,${Math.trunc(truelng)})`;
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className="ccontainer" data-testid="map">
          <MapContainer
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
              url="http://25.1.197.128:8002/map-{z}-{x}{y}-objects.jpg"
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
                <Paper className="coords-pane leaflet-control">
                  <Typography component="h5" variant="h5">
                    Other stuff
                  </Typography>
                  <Typography component="p" variant="p">
                    Other stuff
                  </Typography>
                </Paper>
              </div>
            </div>
          </MapContainer>
        </div>
        <div>
          <Drawer
            variant="persistent"
            anchor="left"
            open={true}
            classes={{ paper: classes.paper }}
          >
            <List>
            <div className={classes.title}>
              <Typography variant="h3" gutterBottom>
                Map
              </Typography>
            </div>
            <Divider />
            <div className={classes.title}>
              <Typography variant="h6" gutterBottom>
                Center Position: (1000, 1000)
              </Typography>
              <Typography variant="h6" gutterBottom>
                Return to center
              </Typography>
              <Button onClick={() => this.centerMap(this.state.map)}>Center</Button>
            </div>
            <Divider />
            <div className={classes.title}>
              <Typography variant="h6" gutterBottom>
                Coordinate Control
              </Typography>
              <Typography variant="h6" gutterBottom>
                Current Location {this.state.currentPos &&
                  this.tileTolatlong(this.state.currentPos)}
              </Typography>
              <div className={classes.coordright}>
                <TextField label="X Coordinate" type="number" onChange={(event) => {const { value } = event.target; this.handleCoordChange(0, value)}}/>
              </div>
              <div className={classes.coordleft}>
                <TextField label="Y Coordinate" type="number" onChange={(event) => {const { value } = event.target; this.handleCoordChange(1, value)}}/>
              </div>
              <Button onClick={() => this.handleCoordSubmit(this.state.map)}>Move To</Button>

            </div>
            </List>
          </Drawer>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(map);
