import React from "react";
import Card from "react-bootstrap/Card";
import { Button, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./SearchScreen.css";
import Moment from "react-moment";
import _ from "lodash";

export default class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: this.props.activeDefault, start: 0, end: 9 };
  }

  handlePage = async (value) => {
    this.setState({ active: value });
  };

  getAssetType = (assetType) => {
    let info = {
      assettype: "",
    };
    switch (assetType) {
      case -2:
        info.assettype = "Material";
        break;
      case 0:
        info.assettype = "Texture";
        //info.pic = hey;
        break;
      case 1:
        info.assettype = "Sound";
        //info.pic = hey;
        break;
      case 2:
        info.assettype = "Calling Card";
        //info.pic = hey;
        break;
      case 3:
        info.assettype = "Landmark";
        //info.pic = hey;
        break;
      case 5:
        info.assettype = "Clothing";
        //info.pic = hey;
        break;
      case 6:
        info.assettype = "Object";
        //info.pic = hey;
        break;
      case 7:
        info.assettype = "Notecard";
        //info.pic = hey;
        break;
      case 10:
        info.assettype = "LSLText (aka a script)";
        //info.pic = hey;
        break;
      case 13:
        info.assettype = "Body Part";
        //info.pic = hey;
        break;
      case 20:
        info.assettype = "Animation";
        //info.pic = hey;
        break;
      case 21:
        info.assettype = "Gesture";
        //info.pic = hey;
        break;
      case 49:
        info.assettype = "Mesh";
        //info.pic = hey;
        break;
      default:
        info.assettype = "Invalid Type";
        //info.pic = hey;
        break;
    }
    return info;
  };

  nextSet = (length) => {
    if(length > 10){
      if (length > this.state.end) {
        this.setState({ start: this.state.start + 1 });
        this.setState({ end: this.state.end + 1 });
        this.handlePage(this.state.active + 1);
      }
    }else{
      if(this.state.active < length-1){
        this.handlePage(this.state.active + 1);
      }
    }
  };

  lastSet = (length) => {
    if(length > 10){
      if (0 < this.state.start) {
        this.setState({ start: this.state.start - 1 });
        this.setState({ end: this.state.end - 1 });
        this.handlePage(this.state.active - 1);
      }
    }else{
      if(this.state.active > 0){
        this.handlePage(this.state.active - 1);
      }
    }
  };

  endSet = (length) => {
    if (
      (this.state.end < length && this.state.active != length - 1) &&
      (this.state.end - this.state.start === 9)
    ) {
      this.setState({ start: this.state.start + (length - this.state.end) });
      this.setState({ end: length });
    }
    this.handlePage(length - 1);
  };

  firstSet = () => {
    if (
      (this.state.start != 0 || this.state.active != 0) &&
      this.state.end - this.state.start === 9
    ) {
      this.setState({ start: 0 });
      this.setState({ end: 9 });
    }
    this.handlePage(0);
  };

  render() {
    let items = [];
    if (this.props.data) {
      //console.log("Length:", this.props.data.length);
      for (let i = 0; i < Math.ceil(this.props.data.length / 24); i++) {
        items.push(
          <Pagination.Item
            key={i + 1}
            active={i === this.state.active}
            onClick={() => this.handlePage(i)}
          >
            {i + 1}
          </Pagination.Item>
        );
      }
    }

    let temparray =
      this.props.data &&
      this.props.data.slice(
        this.state.active * 24,
        this.state.active * 24 + 24
      );

    if (_.isEmpty(items)) {
      return (
        <div className="centered empty-container">
          <div className="centered body">
            <h2>No results</h2>
            <h6>Refine search and try again</h6>
          </div>
        </div>
      );
    } else
      return (
        <div className="searchContainer">
          <div className="grid-container">
            {this.props.data &&
              temparray.map((obj, index) => {
                return (
                  <div style={{ margin: "1rem" }}>
                    <Card bsPrefix="new-custom">
                      <Card.Header>
                        <Link to={`/item/${obj.id}`}>
                          <Card.Title border="dark" className="text-item">
                            {obj.name}
                          </Card.Title>
                        </Link>
                      </Card.Header>
                      <Card.Body className="body">
                        <Card.Text>
                          Asset Type:{" "}
                          {this.getAssetType(obj.assetType).assettype}
                        </Card.Text>
                        <Card.Text>
                          Create Time:{" "}
                          {
                            <Moment format="MM/DD/YYYY HH:mm" unix>
                              {obj.create_time}
                            </Moment>
                          }
                        </Card.Text>
                        <Link to={`/item/${obj.id}`}>
                          <Button>More Info</Button>
                        </Link>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })}
          </div>
          {this.props.data != null ? (
            <div className="pager" class="d-flex justify-content-center">
              <Pagination>
                <Pagination.First onClick={() => this.firstSet()} />
                <Pagination.Prev onClick={() => this.lastSet(items.length)} />
                {items.slice(this.state.start, this.state.end)}
                <Pagination.Next onClick={() => this.nextSet(items.length)} />
                <Pagination.Last onClick={() => this.endSet(items.length)} />
              </Pagination>
            </div>
          ) : (
            <div />
          )}
        </div>
      );
  }
}
