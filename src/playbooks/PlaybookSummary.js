import React, { Component } from "react";
import styled from "styled-components";
import { Card, CardBody, Label } from "@patternfly/react-core";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  PauseCircleIcon,
  CalendarAltIcon,
  ClockIcon
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

const PlaybookContent = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 800px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const StatusAndName = styled.div`
  display: flex;
  align-items: center;
  min-width: 300px;
`;

const PlaybookInfos = styled.div`
  margin: 2em 0;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  @media (min-width: 800px) {
    flex-direction: row;
    flex-grow: 1;
    margin: 0;
    align-items: center;
  }
`;

const PlaybookInfo = styled.div`
  flex-grow: 1;
  width: 100px;
  max-width: 100px;

  @media (min-width: 800px) {
    text-align: center;
  }
`;

const Labels = styled.div`
  display: flex;
  align-items: center;
  min-width: 100px;

  @media (min-width: 800px) {
    justify-content: flex-end;
    margin-top: 0;
  }
`;

const Duration = styled.div`
  display: flex;
  align-items: center;
  min-width: 100px;

  @media (min-width: 800px) {
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
        <Card>
          <CardBody>
            <PlaybookContent>
              <StatusAndName>
                <StatusIcon status={playbook.status} />
                <h1 className="pf-c-title pf-m-xl pf-u-ml-md">
                  {playbook.name
                    ? playbook.name
                    : playbook.path.split("/").slice(-1)[0]}
                </h1>
              </StatusAndName>
              <PlaybookInfos>
                <PlaybookInfo>
                  <b>{playbook.items.plays}</b> Plays
                </PlaybookInfo>
                <PlaybookInfo>
                  <b>{playbook.items.tasks}</b> Tasks
                </PlaybookInfo>
                <PlaybookInfo>
                  <b>{playbook.items.results}</b> Results
                </PlaybookInfo>
                <PlaybookInfo>
                  <b>{playbook.items.hosts}</b> Hosts
                </PlaybookInfo>
                <PlaybookInfo>
                  <b>{playbook.items.files}</b> Files
                </PlaybookInfo>
                <PlaybookInfo>
                  <b>{playbook.items.records}</b> Records
                </PlaybookInfo>
              </PlaybookInfos>
              <Labels>
                {playbook.labels.map(label => (
                  <Label className="pf-u-mr-md" isCompact>
                    {label.name}
                  </Label>
                ))}
              </Labels>
              <Duration className="pf-u-mr-md">
                <CalendarAltIcon />
                <span className="pf-u-ml-sm">
                  {new Date(playbook.started).toUTCString()}
                </span>
              </Duration>
              <Duration>
                <ClockIcon />
                <span className="pf-u-ml-sm">
                  {playbook.duration}
                </span>
              </Duration>
            </PlaybookContent>
          </CardBody>
        </Card>
      </PlaybookWrapper>
    );
  }
}
