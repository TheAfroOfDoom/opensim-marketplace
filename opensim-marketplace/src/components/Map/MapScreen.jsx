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
import { Container, Grid } from "@material-ui/core";
import L from "leaflet";

export default class map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPos: null,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState({ currentPos: e.latlng });
    console.log(e);
  }

  render() {
    return (
      <div>
        <MapContainer
          center={[1000, 1000]}
          zoom={3}
          scrollWheelZoom={false}
          maxZoom={4}
          minZoom={1}
          onClick={this.handleClick}
          crs={L.CRS.Simple}
        >
          <MapConsumer>
            {(map) => {
              console.log("map center:", map.getCenter());
              console.log(map);
              return null;
            }}
          </MapConsumer>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="http://25.1.197.128:8002/map-{z}-{x}-{y}-objects.jpg"
            //zoomReverse
          />
        </MapContainer>
      </div>
    );
  }
}
