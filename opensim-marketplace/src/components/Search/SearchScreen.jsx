import React from "react";
import { Pagination } from "react-bootstrap";
//import "./SearchScreen.css";
import _ from "lodash";

import NoResults from "./NoResults";
import SearchCard from "./SearchCard";

import { Container, Grid } from "@material-ui/core";

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
    if (length > this.state.end) {
      this.setState({ start: this.state.start + 1 });
      this.setState({ end: this.state.end + 1 });
      this.handlePage(this.state.active + 1);
    }
  };

  lastSet = () => {
    if (0 < this.state.start) {
      this.setState({ start: this.state.start - 1 });
      this.setState({ end: this.state.end - 1 });
      this.handlePage(this.state.active - 1);
    }
  };

  endSet = (length) => {
    if (
      (this.state.end != length || this.state.active != length - 1) &&
      this.state.end - this.state.start === 9
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
      return <NoResults />;
    } else
      return (
        <div>
          <Container maxWidth={false} style={{ marginTop: "30px" }}>
            <Grid container direction="row" alignItems="center" spacing={3}>
              {this.props.data &&
                temparray.map((obj, index) => {
                  return (
                    <Grid item xs={12} md={6} lg={4} xl={3}>
                      <SearchCard
                        obj={obj}
                        index={index}
                        assetType={this.getAssetType(obj.assetType).assettype}
                      />
                    </Grid>
                  );
                })}
            </Grid>
          </Container>

          {this.props.data != null ? (
            <div className="d-flex justify-content-center pager">
              <Pagination>
                <Pagination.First onClick={() => this.firstSet(0)} />
                <Pagination.Prev onClick={() => this.lastSet()} />
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
