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
import { Container, Grid, Paper, Typography } from "@material-ui/core";
import L from "leaflet";

export default class map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPos: null,
      zoom: 17,
      map: null,
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
    return (
      <div className="ccontainer">
        <MapContainer
          center={this.latlongToTile(1000, 1000)}
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
    );
  }
}
