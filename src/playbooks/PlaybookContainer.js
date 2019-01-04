import React, { Component } from "react";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import { LoadingContainer, Container404 } from "../containers";
import { getPlaybook } from "./playbooksActions";
import TasksContainer from "../tasks/TasksContainer";

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
      <div>
        <div className="pf-c-card">
          <div class="pf-c-card__header">
            <h1 className="pf-c-title pf-m-lg">Tasks</h1>
          </div>
          <div className="pf-c-card__body">
            <TasksContainer playbook={playbook} />
          </div>
        </div>
      </div>
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
