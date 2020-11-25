import * as React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

export default function CCard(props) {
  return (
    <div style={{ margin: "auto" }}>
      <Card bsPrefix="cards">
        <Card.Header>
          <Link to={`/item/${props.obj.id}`}>
            <Card.Title border="dark" className="text-item">
              {props.obj.name}
            </Card.Title>
          </Link>
        </Card.Header>
        <Card.Body className="body">
          <h3>
            Creator:{" "}
            {props.obj.useraccount ? props.obj.useraccount.FirstName : "None"}{" "}
            {props.obj.useraccount ? props.obj.useraccount.LastName : "None"}
          </h3>
          <p>
            Asset Type:{" "}
            {
              props.categories.find(
                (element) => element.assetType === props.obj.assetType
              ).name
            }
          </p>
          <p>
            {props.obj.description !== ""
              ? props.obj.description
              : "No Description"}{" "}
          </p>
          <p>
            <Moment format="MM/DD/YYYY HH:mm" unix>
              {props.obj.create_time}
            </Moment>
          </p>
        </Card.Body>
      </Card>
    </div>
  );
}
