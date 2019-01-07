import React, { Component } from "react";
import PlaybookArgs from "./PlaybookArgs";
import PlaybookHosts from "./PlaybookHosts";
import PlaybookFiles from "./PlaybookFiles";
import styled from "styled-components";

function _getIconInfo(status) {
  switch (status) {
    case "running":
      return {
        title: "Playbook is in progress.",
        icon: "fa-pause",
        color: "blue"
      };
    case "completed":
      return {
        title: "Playbook has completed successfully.",
        icon: "fa-check",
        color: "green"
      };
    case "failed":
      return {
        title: "Playbook has failed with one or more errors.",
        icon: "fa-warning",
        color: "red"
      };
    default:
      return {
        title: "Playbook's status is unknown.",
        icon: "fa-warning",
        color: "red"
      };
  }
}

const IconWrapper = styled.i`
  color: ${props => props.color};
`;

class StatusIcon extends Component {
  render() {
    const { status } = this.props;
    const iconInfo = _getIconInfo(status);
    return (
      <IconWrapper
        color={iconInfo.color}
        className={`fas ${iconInfo.icon}`}
        title={iconInfo.title}
      />
    );
  }
}
const DataListCell = styled.div`
  cursor: pointer;
`;

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
        return { expanded: !prevState.expanded, selection: null };
      } else {
        return { expanded: true, selection };
      }
    });
  };

  render() {
    const { playbook } = this.props;
    const { expanded, selection } = this.state;
    return (
      <ul className="pf-c-data-list pf-u-box-shadow-md">
        <li
          className={`pf-c-data-list__item ${expanded ? "pf-m-expanded" : ""}`}
        >
          <div className="pf-c-data-list__check">
            <StatusIcon status={playbook.status} />
          </div>
          <DataListCell className="pf-c-data-list__cell pf-m-flex-5">
            {playbook.path.split("/").slice(-1)[0]}
          </DataListCell>
          <DataListCell
            className="pf-c-data-list__cell pf-m-flex-1"
            onClick={() => this._toggleExpanded("args")}
          >
            <i
              className={`fas fa-angle-${
                selection === "args" ? "down" : "right"
              } pf-u-mr-xs`}
            />
            <b>{Object.keys(playbook.arguments).length}</b> arguments
          </DataListCell>
          <DataListCell
            className="pf-c-data-list__cell pf-m-flex-1"
            onClick={() => this._toggleExpanded("hosts")}
          >
            <i
              className={`fas fa-angle-${
                selection === "hosts" ? "down" : "right"
              } pf-u-mr-xs`}
            />
            <b>{playbook.hosts.length}</b> Hosts
          </DataListCell>
          <DataListCell
            className="pf-c-data-list__cell pf-m-flex-1"
            onClick={() => this._toggleExpanded("files")}
          >
            <i
              className={`fas fa-angle-${
                selection === "files" ? "down" : "right"
              } pf-u-mr-xs`}
            />
            <b>{playbook.files.length}</b> Files
          </DataListCell>
          <DataListCell className="pf-c-data-list__cell pf-u-text-align-right">
            <i className={`fas fa-clock pf-u-mr-xs`} />
            {Math.round(playbook.duration)} sec
          </DataListCell>
          <section
            className="pf-c-data-list__expandable-content"
            aria-label="Primary Content Details"
          >
            {selection === "args" && <PlaybookArgs playbook={playbook} />}
            {selection === "hosts" && <PlaybookHosts playbook={playbook} />}
            {selection === "files" && <PlaybookFiles playbook={playbook} />}
          </section>
        </li>
      </ul>
    );
  }
}
