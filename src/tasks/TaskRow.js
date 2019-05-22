import React, { Component } from "react";
import {
  global_danger_color_100,
  global_success_color_100,
  global_active_color_100,
  global_warning_color_100
} from "@patternfly/react-tokens";

const Status = ({ status, children }) => {
  const colors = {
    ok: global_success_color_100.value,
    failed: global_danger_color_100.value,
    skipped: global_active_color_100.value,
    unreachable: global_warning_color_100.value,
    changed: global_active_color_100.value,
    ignored: global_warning_color_100.value,
    unknown: global_warning_color_100.value
  };
  return (
    <span
      className="pf-c-label pf-u-mr-md"
      style={{ backgroundColor: colors[status] }}
    >
      {children}
    </span>
  );
};

const Statuses = ({ statuses }) => {
  return (
    <div>
      {Object.keys(statuses)
        .filter(status => statuses[status] !== 0)
        .map(status => (
          <Status status={status}>{`${statuses[status]} ${status}`}</Status>
        ))}
    </div>
  );
};

export default class TaskRow extends Component {
  state = {
    isExpanded: false
  };

  toggleExpand = () => {
    this.setState(prevState => ({ isExpanded: !prevState.isExpanded }));
  };
  render() {
    const { isExpanded } = this.state;
    const { task } = this.props;
    return (
      <tbody>
        <tr>
          <td className="pf-c-table__toggle">
            <button
              className={`pf-c-button pf-m-plain ${isExpanded &&
                "pf-m-expanded"}`}
              aria-label="Details"
              aria-controls={`expandable task ${task.name}`}
              aria-expanded={isExpanded ? "true" : "false"}
              onClick={this.toggleExpand}
            >
              <i className="fas fa-angle-down" />
            </button>
          </td>

          <td data-label="Task name">{task.name}</td>
          <td data-label="Task action">{task.action}</td>
          <td data-label="Average duration" className="pf-u-text-align-center">
            {task.average_duration}
          </td>
          <td data-label="Status" className="pf-u-text-align-center">
            {Statuses(task)}
          </td>
        </tr>
        <tr
          className={`pf-c-table__expandable-row ${isExpanded &&
            "pf-m-expanded"}`}
        >
          <td colspan="5">
            <div
              className={`pf-c-table__expandable-row-content pf-u-p-2xl ${isExpanded &&
                "pf-m-expanded"}`}
            >
              <table
                className="pf-c-table pf-m-compact pf-m-no-border-rows"
                role="grid"
              >
                <caption>Task results</caption>
                <thead>
                  <tr>
                    <th className="pf-u-text-align-center">Host</th>
                    <th className="pf-u-text-align-center">Started</th>
                    <th className="pf-u-text-align-center">Ended</th>
                    <th className="pf-u-text-align-center">Duration</th>
                    <th className="pf-u-text-align-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {task.results.map(result => (
                    <tr>
                      <td data-label="Host" className="pf-u-text-align-center">
                        {result.host.name}
                      </td>
                      <td
                        data-label="Started"
                        className="pf-u-text-align-center"
                      >
                        {result.started}
                      </td>
                      <td data-label="Ended" className="pf-u-text-align-center">
                        {result.ended}
                      </td>
                      <td
                        data-label="Duration"
                        className="pf-u-text-align-center"
                      >
                        {result.duration}
                      </td>
                      <td
                        data-label="Status"
                        className="pf-u-text-align-center"
                      >
                        <Status status={result.status}>{result.status}</Status>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </td>
          <td />
        </tr>
      </tbody>
    );
  }
}
