import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";

import "@patternfly/patternfly-next/patternfly.css";
import "@patternfly/patternfly-next/patternfly-addons.css";
import store from "./store";
import { getConfig } from "./config/configActions";
import * as Containers from "./containers";
import Header from "./layout/navigation/Header";

class App extends Component {
  state = {
    isLoading: true
  };

  componentDidMount() {
    store.dispatch(getConfig()).then(() => this.setState({ isLoading: false }));
  }

  render() {
    const { isLoading } = this.state;
    if (isLoading) return null;
    return (
      <Provider store={store}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div>
          <div className="pf-c-background-image" />
          <div className="pf-c-page" id="page-layout-horizontal-nav">
            <Header />
            <main role="main" className="pf-c-page__main">
              <section className="pf-c-page__main-section">
                <Switch>
                  <Redirect from="/" exact to="/playbooks" />
                  <Route
                    path="/playbooks"
                    exact
                    component={Containers.PlaybooksContainer}
                  />
                  <Route
                    path="/playbooks/:id"
                    component={Containers.PlaybookContainer}
                  />
                  <Route component={Containers.Container404} />
                </Switch>
              </section>
            </main>
          </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
