import React, { Component } from "react";
import { Row, Col, ListView, Icon } from "patternfly-react";
import { Link } from "react-router-dom";
import PlaybookArgs from "./PlaybookArgs";

export default class Playbook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      selection: null
    };
  }

  _toggleExpanded = selection => {
    this.setState(prevState => {
      if (selection === prevState.selection) {
        return { expanded: !prevState.expanded };
      } else {
        return { expanded: true, selection };
      }
    });
  };

  render() {
    const { playbook } = this.props;
    const { expanded, selection } = this.state;
    const LeftIcon = playbook.completed ? (
      <ListView.Icon
        name="check"
        size="md"
        title="Playbook completed successfully"
        className="list-view-pf-icon-success"
      />
    ) : (
      <ListView.Icon
        name="info"
        title="Playbook execution is either in progress or was interrupted: data will be inconsistent"
        size="md"
        className="list-view-pf-icon-info"
      />
    );
    return (
      <ListView.Item
        checkboxInput={
          <Link to={`/playbooks/${playbook.id}`} className="navbar-brand">
            <Icon name="link" size="lg" />
          </Link>
        }
        leftContent={LeftIcon}
        additionalInfo={[
          <ListView.InfoItem key="args">
            <ListView.Expand
              expanded={expanded && selection === "args"}
              toggleExpanded={() => this._toggleExpanded("args")}
            >
              <Icon name="cogs" />
              Arguments
            </ListView.Expand>
          </ListView.InfoItem>,
          <ListView.InfoItem key="hosts">
            <ListView.Expand
              expanded={expanded && selection === "hosts"}
              toggleExpanded={() => this._toggleExpanded("hosts")}
            >
              <Icon name="server" />
              <b>{playbook.hosts.length}</b> Hosts
            </ListView.Expand>
          </ListView.InfoItem>,
          <ListView.InfoItem key="files">
            <ListView.Expand
              expanded={expanded && selection === "files"}
              toggleExpanded={() => this._toggleExpanded("files")}
            >
              <Icon name="folder-open" />
              <b>{playbook.files.length}</b> Files
            </ListView.Expand>
          </ListView.InfoItem>
        ]}
        actions={
          <span>
            <Icon name="clock-o" size="lg" /> {Math.round(playbook.duration)} sec
          </span>
        }
        heading={
          playbook.name
            ? playbook.name
            : playbook.file.path.split("/").slice(-1)[0]
        }
        stacked={false}
        compoundExpand
        compoundExpanded={expanded}
        onCloseCompoundExpand={() => this.setState({ expanded: false })}
      >
        <Row>
          <Col xs={12} sm={8} smOffset={2} md={6} mdOffset={3}>
            {selection === "args" ? (
              <PlaybookArgs playbook={playbook} />
            ) : (
              selection
            )}
          </Col>
        </Row>
      </ListView.Item>
    );
  }
}
