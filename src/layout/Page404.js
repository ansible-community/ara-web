import React, { Component } from "react";
import {
  Bullseye,
  Button,
  PageSection,
  PageSectionVariants,
} from "@patternfly/react-core";

export default class Page404 extends Component {
  render() {
    return (
      <PageSection variant={PageSectionVariants.light}>
        <Bullseye>
          <p className="pf-u-text-align-center">
            We are looking for your page...but we can't find it
            <br />
            <Button
              variant="secondary"
              component="a"
              href="/"
              className="pf-u-mt-xl"
            >
              Go to index
            </Button>
          </p>
        </Bullseye>
      </PageSection>
    );
  }
}
