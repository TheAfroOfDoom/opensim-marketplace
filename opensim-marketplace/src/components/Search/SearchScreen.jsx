import React from "react";
import Card from "react-bootstrap/Card";
import {
  Nav,
  Form,
  FormControl,
  NavDropdown,
  Button,
  Pagination,
} from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";
import "./SearchScreen.css";

export default class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: this.props.activeDefault };
  }

  handlePage = async (value) => {
    this.setState({ active: value });
  };

  render() {
    let items = [];
    if (this.props.data) {
      console.log("Length:", this.props.data.length);
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
                      <Link to={`/item/${obj.id}`}>
                        <Button>More Info</Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
        </div>
        <div className="pager">
          <Pagination>{items}</Pagination>
        </div>
      </div>
    );
  }
}
//bg={"Info".toLowerCase()}
//style={{ width: "18rem", height: "9rem" }}
