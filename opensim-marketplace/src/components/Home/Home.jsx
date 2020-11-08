import React from "react";

import { Form, Button, Row, Col, Image } from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default class Home extends React.Component {


  getsqldata = () => {
    axios.get("/test").then((response) => {
      console.log(response.data);
    });
  };

  render(){

    return(
      <div>
        <button onClick={this.getsqldata}>Get table</button>
        
      </div>
    )
  }

}
