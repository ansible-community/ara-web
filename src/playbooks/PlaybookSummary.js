import React, { Component } from "react";
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
        className={`fa ${iconInfo.icon}`}
        title={iconInfo.title}
      />
    );
  }
}

const PlaybookWrapper = styled.div`
  cursor: pointer;
  &:hover {
    .pf-c-card {
      background: rgba(0, 0, 0, 0)
        linear-gradient(
          to right,
          rgb(57, 165, 220) 0px,
          rgb(57, 165, 220) 5px,
          rgb(255, 255, 255) 5px,
          rgb(255, 255, 255) 100%
        )
        no-repeat scroll 0% 0%;
    }
  }
`;

const StatusAndName = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 1em;
  @media (min-width: 587px) {
    width: 25%;
    margin-bottom: 0;
  }
`;
const PlaybookInfo = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 1em;
  @media (min-width: 587px) {
    width: 50%;
    margin-bottom: 0;
  }
`;
const Duration = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  @media (min-width: 587px) {
    width: 25%;
    justify-content: flex-end;
  }
`;

export default class Playbook extends Component {
  render() {
    const { playbook, history } = this.props;
    return (
      <PlaybookWrapper
        className="pf-u-mb-xs"
        onClick={() => history.push(`/playbooks/${playbook.id}`)}
      >
        <div className="pf-c-card">
          <div className="pf-c-card__body">
            <div className="pf-u-display-flex pf-u-flex-direction-column pf-u-flex-direction-row-on-md">
              <StatusAndName>
                <StatusIcon status={playbook.status} />
                <h1 className="pf-c-title pf-m-xl pf-u-ml-lg">
                  {playbook.path.split("/").slice(-1)[0]}
                </h1>
              </StatusAndName>
              <PlaybookInfo>
                <span className="pf-u-mr-xl">
                  <b>{Object.keys(playbook.arguments).length}</b> arguments
                </span>
                <span className="pf-u-mr-xl">
                  <b>{playbook.hosts.length}</b> Hosts
                </span>
                <span className="pf-u-mr-xl">
                  <b>{playbook.files.length}</b> Files
                </span>
              </PlaybookInfo>
              <Duration>
                <i className="fa fa-clock" />
                <span className="pf-u-ml-xs">
                  {Math.round(playbook.duration)} sec
                </span>
              </Duration>
            </div>
          </div>
        </div>
      </PlaybookWrapper>
    );
  }
}

