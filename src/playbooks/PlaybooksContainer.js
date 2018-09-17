import React, { Component } from "react";
import { connect } from "react-redux";
import { ListView } from "patternfly-react";

import { MainContainer } from "../containers";
import { getPlaybooks } from "./playbooksActions";
import Playbook from "./Playbook";

export class PlaybooksContainer extends Component {
  componentDidMount() {
    this.props.getPlaybooks();
  }
  render() {
    const { playbooks } = this.props;
    return (
      <MainContainer>
        <ListView>
          {playbooks.map(playbook => (
            <Playbook key={playbook.id} playbook={playbook} />
          ))}
        </ListView>
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
