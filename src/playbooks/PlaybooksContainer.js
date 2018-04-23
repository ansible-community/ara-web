import React, { Component } from "react";
import { connect } from "react-redux";
import { MainContainer } from "../containers";
import { getPlaybooks } from "./playbooksActions";

export class PlaybooksContainer extends Component {
  componentDidMount() {
    this.props.getPlaybooks();
  }
  render() {
    const { playbooks } = this.props;
    return (
      <MainContainer>
        <p>playbooks</p>
        <ul>
          {playbooks.map(playbook => (
            <li key={playbook.id}>{playbook.id}</li>
          ))}
        </ul>
      </MainContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    playbooks: Object.values(state.playbooks)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPlaybooks: () => dispatch(getPlaybooks())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaybooksContainer);
