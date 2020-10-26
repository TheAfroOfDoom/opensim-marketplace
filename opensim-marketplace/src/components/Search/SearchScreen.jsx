import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "./SearchScreen.css";

export default class SearchScreen extends React.Component {
  render() {
    return (
      <div className="grid-container">
        {this.props.data &&
          this.props.data.map((obj, index) => {
            return (
              <div style={{ margin: "1rem" }}>
                <Card
                  bg={"Info".toLowerCase()}
                  style={{ width: "18rem", height: "9rem" }}
                  className="mb-2"
                >
                  <Card.Header>Card #{index}</Card.Header>
                  <Card.Body>
                    <Link to={`/item/${obj.id}`}>
                      <Card.Title>{obj.name}</Card.Title>
                    </Link>
                    <Card.Text>Quick Text</Card.Text>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
      </div>
    );
  }
}
