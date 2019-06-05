import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router";
import {
  Brand,
  Nav,
  NavItem,
  NavList,
  NavVariants,
  PageHeader
} from "@patternfly/react-core";
import logo from "../images/logo.svg";

const Logo = styled(Brand)`
  height: 45px;
`;

class Header extends Component {
  render() {
    const { location, history, isAuthenticated } = this.props;
    if (!isAuthenticated) return null;
    const TopNav = (
      <Nav onSelect={this.onNavSelect} aria-label="Nav">
        <NavList variant={NavVariants.horizontal}>
          <NavItem
            to="/playbooks"
            onClick={() => history.push("/playbooks")}
            isActive={location.pathname.indexOf("playbooks") !== -1}
            preventDefault
          >
            Playbooks
          </NavItem>
          <NavItem
            to="https://ara.readthedocs.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </NavItem>
        </NavList>
      </Nav>
    );
    return (
      <PageHeader
        logo={<Logo src={logo} alt="Ara Logo" />}
        logoProps={{ href: "/" }}
        topNav={TopNav}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
}

export default connect(mapStateToProps)(withRouter(Header));
