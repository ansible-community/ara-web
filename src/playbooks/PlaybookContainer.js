import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  List,
  ListItem,
  PageSection,
  PageSectionVariants
} from "@patternfly/react-core";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import { LoadingContainer, Container404 } from "../containers";
import { getPlaybook } from "./playbooksActions";

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
            <table class="pf-c-table pf-m-compact pf-m-grid-md" role="grid">
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
          {playbook.plays.map(play => (
            <CardBody>
              <h2>{play.name}</h2>
              <List>
                <ListItem>Started: {play.started}</ListItem>
                <ListItem>Ended: {play.ended}</ListItem>
                <ListItem>Duration: {play.duration}</ListItem>
              </List>
              <table class="pf-c-table pf-m-compact pf-m-grid-md" role="grid">
                <thead>
                  <tr>
                    <th>Task</th>
                    <th>Host</th>
                    <th>Action</th>
                    <th>Duration</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {play.tasks.map(task =>
                    task.results.map(result => (
                      <tr key={result.id}>
                        <th data-label="Task">{task.name}</th>
                        <th data-label="Host">{result.host.name}</th>
                        <th data-label="Action">{task.action}</th>
                        <th data-label="Duration">{result.duration}</th>
                        <th data-label="Status">{result.status}</th>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </CardBody>
          ))}
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
