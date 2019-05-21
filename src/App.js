import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";

import "@patternfly/patternfly/patternfly.css";
import "@patternfly/patternfly/patternfly-addons.css";
import store from "./store";
import { getConfig } from "./config/configActions";
import * as Containers from "./containers";
import Header from "./layout/navigation/Header";
import Page from "./layout/Page";

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
          <Page header={<Header />}>
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
          </Page>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
