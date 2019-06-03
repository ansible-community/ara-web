import React, { Component } from "react";
import { connect } from "react-redux";
import {
  LoginFooterItem,
  LoginForm,
  LoginPage,
  ListItem
} from "@patternfly/react-core";
import { Redirect } from "react-router-dom";
import logo from "../images/logo.svg";
import { login } from "../auth/authActions";

export class AraLoginPage extends Component {
  state = {
    showHelperText: false,
    helperText: "",
    username: "",
    isValidUsername: true,
    password: "",
    isValidPassword: true,
    redirectToReferrer: false
  };

  handleUsernameChange = username => {
    this.setState({ username });
  };

  handlePasswordChange = password => {
    this.setState({ password });
  };

  onLoginButtonClick = event => {
    event.preventDefault();
    const { username, password } = this.state;
    const { login } = this.props;
    login(username, password)
      .then(() => {
        this.setState({ redirectToReferrer: true });
      })
      .catch(() => {
        this.setState({
          showHelperText: true,
          isValidUsername: false,
          isValidPassword: false,
          helperText: "Invalid username or password"
        });
      });
  };

  render() {
    const {
      username,
      isValidUsername,
      password,
      isValidPassword,
      showHelperText,
      helperText,
      redirectToReferrer
    } = this.state;
    const { location, isAuthenticated } = this.props;
    const { from } = location.state || { from: { pathname: "/" } };

    if (redirectToReferrer || isAuthenticated) return <Redirect to={from} />;

    const loginForm = (
      <LoginForm
        showHelperText={showHelperText}
        helperText={helperText}
        usernameLabel="Username"
        usernameValue={username}
        isValidUsername={isValidUsername}
        onChangeUsername={this.handleUsernameChange}
        passwordLabel="Password"
        passwordValue={password}
        isValidPassword={isValidPassword}
        onChangePassword={this.handlePasswordChange}
        onLoginButtonClick={this.onLoginButtonClick}
      />
    );
    return (
      <LoginPage
        footerListVariants="inline"
        brandImgSrc={logo}
        brandImgAlt="Ara"
        footerListItems={
          <ListItem>
            <LoginFooterItem href="https://ara.readthedocs.io/en/feature-1.0/">
              Documentation
            </LoginFooterItem>
          </ListItem>
        }
        textContent="The ARA API server you are connecting to requires authentication. Please specify your credentials to proceed."
        loginTitle="Log in to your account"
      >
        {loginForm}
      </LoginPage>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: (username, password) => dispatch(login(username, password))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AraLoginPage);
