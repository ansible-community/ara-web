import React, { Component } from "react";

export default class LoadingContainer extends Component {
  render() {
    return (
        <div className="pf-l-bullseye">
          <div className="pf-l-bullseye__item">
            <div className="pf-c-card">
              <div className="pf-c-card__body">loading</div>
            </div>
          </div>
        </div>
    );
  }
}
