import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";

import "./App.css";
import store from "./store";
import { setConfig } from "./config/configActions";
import * as Containers from "./containers";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    store.dispatch(setConfig({ apiURL: "http://localhost:8000" }));
    this.setState({ loading: false });
  }

  render() {
    return (
      <div className="App">
        {this.state.loading ? (
          <Containers.LoadingContainer />
        ) : (
          <Provider store={store}>
            <BrowserRouter>
              <Switch>
                <Redirect from="/" exact to="/playbooks" />
                <Route
                  path="/playbooks"
                  exact
                  component={Containers.PlaybooksContainer}
                />
                <Route
                  path="/about"
                  exact
                  component={Containers.AboutContainer}
                />
                <Route component={Containers.Container404} />
              </Switch>
            </BrowserRouter>
          </Provider>
        )}
      </div>
    );
  }
}

export default App;
