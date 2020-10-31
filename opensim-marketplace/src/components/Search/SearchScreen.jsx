import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "./SearchScreen.css";
import Pagination from "react-bootstrap/Pagination";

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
      for (let i = 0; i < Math.ceil(this.props.data.length / 20); i++) {
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
        this.state.active * 20,
        this.state.active * 20 + 20
      );

    return (
      <div>
        <div className="grid-container">
          {this.props.data &&
            this.props.data &&
            temparray.map((obj, index) => {
              return (
                <div style={{ margin: "1rem" }}>
                  <Card
                    bg={"Info".toLowerCase()}
                    style={{ width: "18rem", height: "9rem" }}
                    className="grid-item"
                  >
                    <Card.Body>
                      <Link to={`/item/${obj.id}`}>
                        <Card.Title className="grid-item">
                          {obj.name}
                        </Card.Title>
                      </Link>
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
        </div>
        <Pagination>{items}</Pagination>
      </div>
    );
  }
}

//<Card.Header>Card #{index}</Card.Header>
