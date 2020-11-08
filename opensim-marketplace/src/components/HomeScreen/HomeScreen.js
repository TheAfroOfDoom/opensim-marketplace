import React from "react";

import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import "./HomeScreen.css";

export default class HomeScreen extends React.Component {
  render() {
    return (
      <div>
        <Carousel>
          <Carousel.Item>
            <div className="Carousel"></div>
            <Carousel.Caption>
              <h3>First Item</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <div className="Carousel"></div>

            <Carousel.Caption>
              <h3>Second Item</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <div className="Carousel"></div>

            <Carousel.Caption>
              <h3>Third Item</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }
}
