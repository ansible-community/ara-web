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
import { CubesIcon } from "@patternfly/react-icons";
import { LoadingContainer } from "../containers";
import { getPlaybooks } from "./playbooksActions";
import PlaybookSummary from "./PlaybookSummary";

export class PlaybooksContainer extends Component {
  state = {
    isLoading: true
  };

  componentDidMount() {
    this.props
      .getPlaybooks()
      .catch(error => console.log(error))
      .then(() => this.setState({ isLoading: false }));
  }

  render() {
    const { playbooks, history } = this.props;
    const { isLoading } = this.state;

    if (isLoading) {
      return <LoadingContainer />;
    }

    return (
      <PageSection variant={PageSectionVariants.default}>
        {!isLoading && isEmpty(playbooks) && (
          <Bullseye>
            <Card>
              <CardBody>
                <EmptyState variant={EmptyStateVariant.large}>
                  <EmptyStateIcon icon={CubesIcon} />
                  <Title headingLevel="h5" size="lg">
                    No playbooks
                  </Title>
                  <EmptyStateBody>
                    There is no playbook available on this instance of Ara
                  </EmptyStateBody>
                  <Button
                    variant="primary"
                    component="a"
                    href="https://ara.readthedocs.io/en/latest/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    See documentation
                  </Button>
                </EmptyState>
              </CardBody>
            </Card>
          </Bullseye>
        )}
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
