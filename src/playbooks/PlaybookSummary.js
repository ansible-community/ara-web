import React, { Component } from "react";
import styled from "styled-components";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  PauseCircleIcon
} from "@patternfly/react-icons";
import {
  global_danger_color_100,
  global_success_color_100,
  global_active_color_100,
  global_warning_color_100,
  global_Color_light_100
} from "@patternfly/react-tokens";

const StatusIcon = ({ status }) => {
  switch (status) {
    case "running":
      return (
        <PauseCircleIcon
          title="Playbook is in progress."
          size="md"
          style={{ color: global_active_color_100.value }}
        />
      );
    case "completed":
      return (
        <CheckCircleIcon
          title="Playbook has completed successfully."
          size="md"
          style={{ color: global_success_color_100.value }}
        />
      );
    case "failed":
      return (
        <ExclamationCircleIcon
          title="Playbook has failed with one or more errors."
          size="md"
          style={{ color: global_danger_color_100.value }}
        />
      );
    default:
      return (
        <ExclamationCircleIcon
          title="Playbook's status is unknown."
          size="md"
          style={{ color: global_warning_color_100.value }}
        />
      );
  }
};

function getBackground(status, backgroundColor = global_Color_light_100.value) {
  switch (status) {
    case "running":
      return `linear-gradient(to right,${global_active_color_100.value} 0,${
        global_active_color_100.value
      } 5px,${backgroundColor} 5px,${backgroundColor} 100%) no-repeat`;
    case "completed":
      return `linear-gradient(to right,${global_success_color_100.value} 0,${
        global_success_color_100.value
      } 5px,${backgroundColor} 5px,${backgroundColor} 100%) no-repeat`;
    case "failed":
      return `linear-gradient(to right,${global_danger_color_100.value} 0,${
        global_danger_color_100.value
      } 5px,${backgroundColor} 5px,${backgroundColor} 100%) no-repeat`;
    default:
      return `linear-gradient(to right,${global_warning_color_100.value} 0,${
        global_warning_color_100.value
      } 5px,${backgroundColor} 5px,${backgroundColor} 100%) no-repeat`;
  }
}

const PlaybookWrapper = styled.div`
  cursor: pointer;
  &:hover {
    .pf-c-card {
      background: ${props => getBackground(props.status)};
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

const PlaybookInfos = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  align-items: center;
  width: 100%;
  @media (min-width: 587px) {
    width: 50%;
  }
`;

const PlaybookInfo = styled.div`
  width: 140px;
  @media (min-width: 587px) {
    text-align: center;
  }
`;

const Duration = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 1em;
  @media (min-width: 587px) {
    width: 25%;
    justify-content: flex-end;
    margin-top: 0;
  }
`;

export default class Playbook extends Component {
  render() {
    const { playbook, history } = this.props;
    return (
      <PlaybookWrapper
        status={playbook.status}
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
              <PlaybookInfos>
                <PlaybookInfo className="pf-u-mr-xl">
                  <b>{Object.keys(playbook.arguments).length}</b> arguments
                </PlaybookInfo>
                <PlaybookInfo className="pf-u-mr-xl">
                  <b>{playbook.hosts.length}</b> Hosts
                </PlaybookInfo>
                <PlaybookInfo className="pf-u-mr-xl">
                  <b>{playbook.files.length}</b> Files
                </PlaybookInfo>
                <PlaybookInfo className="pf-u-mr-xl">
                  <b>{Object.keys(playbook.tasks).length}</b> tasks
                </PlaybookInfo>
                <PlaybookInfo className="pf-u-mr-xl">
                  <b>{Object.keys(playbook.plays).length}</b> plays
                </PlaybookInfo>
                <PlaybookInfo className="pf-u-mr-xl">
                  <b>{Object.keys(playbook.records).length}</b> records
                </PlaybookInfo>
              </PlaybookInfos>
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
