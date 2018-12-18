import React, { Component } from "react";
import Header from "./navigation/Header";

export default class MainContainer extends Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        <div className="pf-c-background-image" />
        <div className="pf-c-page" id="page-layout-horizontal-nav">
          <Header />
          <main role="main" className="pf-c-page__main">
            <section className="pf-c-page__main-section">{children}</section>
          </main>
        </div>
      </div>
    );
  }
}
