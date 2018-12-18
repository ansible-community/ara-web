import React, { Component } from "react";
import { connect } from "react-redux";
import { isEmpty } from "lodash";

import { MainContainer } from "../containers";
import { getPlaybooks } from "./playbooksActions";
import Playbook from "./Playbook";

export class PlaybooksContainer extends Component {
  state = {
    isLoading: true
  };
  componentDidMount() {
    this.props
      .getPlaybooks()
      .catch(error => console.log(error))
      .then(() => this.setState({ isLoading: false }));
  }
  render() {
    const { playbooks } = this.props;
    const { isLoading } = this.state;
    return (
      <MainContainer>
        {isLoading && (
          <div className="pf-l-bullseye">
            <div className="pf-l-bullseye__item">
              <div className="pf-c-card">
                <div className="pf-c-card__body">loading</div>
              </div>
            </div>
          </div>
        )}
        {!isLoading && isEmpty(playbooks) && (
          <div className="pf-l-bullseye">
            <div className="pf-l-bullseye__item">
              <div className="pf-c-card">
                <div className="pf-c-card__body">
                  <div className="pf-c-empty-state">
                    <i
                      className="fas fa-cubes pf-c-empty-state__icon"
                      aria-hidden="true"
                    />
                    <h1 className="pf-c-title pf-m-lg">No playbooks</h1>
                    <p className="pf-c-empty-state__body">
                      There is no playbook available on this instance of Ara
                    </p>
                    <div className="pf-c-empty-state__action">
                      <a
                        href="https://ara.readthedocs.io/en/latest/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        See documentation
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {playbooks.map(playbook => (
          <Playbook key={playbook.id} playbook={playbook} />
        ))}
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
