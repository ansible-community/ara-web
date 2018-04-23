import React, { Component } from "react";
import Navbar from "./navigation/Navbar";
import { Grid, Row, Col } from "patternfly-react";

export default class MainContainer extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className="MainContent">
        <Navbar />
        <Grid fluid>
          <Row>
            <Col xs={12}>{children}</Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
