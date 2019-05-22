import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  PageSection,
  PageSectionVariants
} from "@patternfly/react-core";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import { LoadingContainer, Container404 } from "../containers";
import { getPlaybook } from "./playbooksActions";
import Tasks from "../tasks/Tasks";
import { extractTasksFromPlays } from "../tasks/task";

export class PlaybookContainer extends Component {
  state = {
    isLoading: true,
    playbook: null
  };

  componentDidMount() {
    this.props
      .getPlaybook({ id: this.props.match.params.id })
      .then(response => this.setState({ playbook: response.data }))
      .catch(error => console.log(error))
      .then(() => this.setState({ isLoading: false }));
  }

  render() {
    const { isLoading, playbook } = this.state;
    if (isLoading) {
      return <LoadingContainer />;
    }
    if (!isLoading && isEmpty(playbook)) {
      return <Container404 />;
    }
    return (
      <PageSection variant={PageSectionVariants.light}>
        <Card>
          <CardHeader>Hosts</CardHeader>
          <CardBody>
            <table className="pf-c-table pf-m-compact pf-m-grid-md" role="grid">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>OK</th>
                  <th>CHANGED</th>
                  <th>FAILED</th>
                  <th>SKIPPED</th>
                  <th>UNREACHABLE</th>
                </tr>
              </thead>
              <tbody>
                {playbook.hosts.map(host => (
                  <tr key={host.id}>
                    <td data-label="Name">{host.name}</td>
                    <td data-label="OK">{host.ok}</td>
                    <td data-label="CHANGED">{host.changed}</td>
                    <td data-label="FAILED">{host.failed}</td>
                    <td data-label="SKIPPED">{host.skipped}</td>
                    <td data-label="UNREACHABLE">{host.unreachable}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Plays</CardHeader>
          <Tasks tasks={extractTasksFromPlays(playbook.plays)} />
        </Card>
      </PageSection>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPlaybook: playbook => dispatch(getPlaybook(playbook))
  };
}

export default connect(
  null,
  mapDispatchToProps
)(PlaybookContainer);
