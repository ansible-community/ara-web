import React, { Component } from "react";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import {
  Bullseye,
  Button,
  Card,
  CardBody,
  EmptyState,
  EmptyStateVariant,
  EmptyStateIcon,
  EmptyStateBody,
  PageSection,
  PageSectionVariants,
  Title
} from "@patternfly/react-core";
import { CubesIcon, ErrorCircleOIcon } from "@patternfly/react-icons";
import { LoadingContainer } from "../containers";
import { getPlaybooks } from "./playbooksActions";
import PlaybookSummary from "./PlaybookSummary";

export class PlaybooksContainer extends Component {
  state = {
    isLoading: true,
    hasError: false,
    errorMessage: ""
  };

  componentDidMount() {
    const { getPlaybooks, config } = this.props;
    getPlaybooks()
      .catch(error => {
        let errorMessage = "";
        if (error.response) {
          errorMessage = error.message;
        } else {
          errorMessage = `Server located at ${
            config.apiURL
          } is unreachable. Check your configuration. Verify that cross-origin requests are not blocked.`;
        }
        this.setState({ errorMessage, hasError: true });
      })
      .then(() => this.setState({ isLoading: false }));
  }

  render() {
    const { playbooks, history } = this.props;
    const { isLoading, hasError, errorMessage } = this.state;

    if (isLoading) {
      return <LoadingContainer />;
    }

    if (!isLoading && hasError) {
      return (
        <PageSection variant={PageSectionVariants.default}>
          <Bullseye>
            <Card>
              <CardBody>
                <EmptyState variant={EmptyStateVariant.large}>
                  <EmptyStateIcon icon={ErrorCircleOIcon} />
                  <Title headingLevel="h5" size="lg">
                    Error
                  </Title>
                  <EmptyStateBody>{errorMessage}</EmptyStateBody>
                </EmptyState>
              </CardBody>
            </Card>
          </Bullseye>
        </PageSection>
      );
    }

    if (!isLoading && isEmpty(playbooks)) {
      return (
        <PageSection variant={PageSectionVariants.default}>
          <Bullseye>
            <Card>
              <CardBody>
                <EmptyState variant={EmptyStateVariant.large}>
                  <EmptyStateIcon icon={CubesIcon} />
                  <Title headingLevel="h5" size="lg">
                    No playbooks
                  </Title>
                  <EmptyStateBody>
                    No playbooks have been found when querying the ARA API
                    server.
                  </EmptyStateBody>
                  <Button
                    variant="primary"
                    component="a"
                    href="https://ara.readthedocs.io/en/feature-1.0/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    See documentation
                  </Button>
                </EmptyState>
              </CardBody>
            </Card>
          </Bullseye>
        </PageSection>
      );
    }

    return (
      <PageSection variant={PageSectionVariants.default}>
        {playbooks.map(playbook => (
          <PlaybookSummary
            key={playbook.id}
            playbook={playbook}
            history={history}
          />
        ))}
      </PageSection>
    );
  }
}

function mapStateToProps(state) {
  return {
    config: state.config,
    playbooks: Object.values(state.playbooks)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPlaybooks: () => dispatch(getPlaybooks())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaybooksContainer);
