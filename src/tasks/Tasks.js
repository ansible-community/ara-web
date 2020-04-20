import React, { Component } from "react";
import TaskRow from "./TaskRow";

export default class Tasks extends Component {
  render() {
    const { tasks } = this.props;
    return (
      <table
        className="pf-c-table pf-m-compact pf-m-expandable"
        role="grid"
        aria-label="Tasks table"
      >
        <thead>
          <tr>
            <td />
            <td>Task Name</td>
            <td>Action</td>
            <td className="pf-u-text-align-center">Average Duration</td>
            <td className="pf-u-text-align-center">Status</td>
          </tr>
        </thead>
        {tasks.map((task) => (
          <TaskRow task={task} />
        ))}
      </table>
    );
  }
}
