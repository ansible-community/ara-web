import React, { Component } from "react";
import {
  Bullseye,
  Card,
  CardBody,
  PageSection,
  PageSectionVariants
} from "@patternfly/react-core";

export default class LoadingContainer extends Component {
  state = {
    seconds: 0
  };

  tick() {
    this.setState(state => ({
      seconds: state.seconds + 1
    }));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { seconds } = this.state;
    const nbDots = 3;
    const nbDotsToDisplay = (seconds % nbDots) + 1;
    const dots = ".".repeat(nbDotsToDisplay);
    const spaces = " ".repeat(nbDots - nbDotsToDisplay).replace(/ /g, "\u00a0");
    return (
      <PageSection variant={PageSectionVariants.default}>
        <Bullseye>
          <Card>
            <CardBody>{`loading${dots}${spaces}`}</CardBody>
          </Card>
        </Bullseye>
      </PageSection>
    );
  }
}
