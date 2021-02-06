import React from "react";
import axios from "axios";

export default class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
  }

  async componentDidMount() {
    try {
      const response = await axios.get("/api/wifi/map", {
        params: { x: this.props.x, y: this.props.y, zoom: this.props.zoom },
      });
      this.setState({ data: response.data });
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    return <img src={this.state.data} />;
  }
}
