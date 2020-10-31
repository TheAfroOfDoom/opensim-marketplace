import React from "react";
import Card from "react-bootstrap/Card";
import { Nav, Form, FormControl, NavDropdown, Button, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./SearchScreen.css";

export default class SearchScreen extends React.Component {


  render() {

    if(this.props.data == null){
      return <div />;
    }else{
        console.log(this.pager);
      return (
        <div>
          <div className="grid-container">
            {this.props.data &&
              this.props.data.slice(0,20).map((obj, index) => {
                return (
                  <div style={{ margin: "1rem" }}>
                    <Card
                      bg={"Info".toLowerCase()}
                      style={{ width: "18rem", height: "9rem" }}
                      className="grid-item"
                    >
                      <Card.Body>
                        <Link to={`/item/${obj.id}`}>
                          <Card.Title className="grid-item">{obj.name}</Card.Title>
                        </Link>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })}

            </div>
        </div>

      );
    }
  }
}



//<Card.Header>Card #{index}</Card.Header>
