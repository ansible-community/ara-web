import React, { Component } from "react";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import { getTasks } from "./tasksActions";

export class TasksContainer extends Component {
  state = {
    isLoading: true,
    tasks: []
  };

  componentDidMount() {
    const { playbook, getTasks } = this.props;
    getTasks(playbook)
      .then(response => this.setState({ tasks: response.data.results }))
      .catch(error => console.log(error))
      .then(() => this.setState({ isLoading: false }));
  }

  render() {
    const { isLoading, tasks } = this.state;
    if (isLoading) {
      return null;
    }
    if (!isLoading && isEmpty(tasks)) {
      return <div>no tasks for this playbook</div>;
    }
    return (
      <table class="pf-c-table pf-m-compact pf-m-grid-md" role="grid">
        <thead>
          <tr>
            <th>Name</th>
            <th>Action</th>
            <th>Duration</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <th data-label="Task Name">{task.name}</th>
              <th data-label="Action">{task.action}</th>
              <th data-label="Duration">{task.duration}</th>
              <th data-label="Status">{task.status}</th>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getTasks: playbook => dispatch(getTasks(playbook))
  };
}

export default connect(
  null,
  mapDispatchToProps
)(TasksContainer);
