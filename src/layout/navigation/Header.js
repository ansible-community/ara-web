import React, { Component } from "react";
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
import logo from "./logo.svg";

const Logo = styled(Brand)`
  height: 45px;
`;

class Header extends Component {
  render() {
    const { location, history } = this.props;
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
            to="https://ara.readthedocs.io/en/feature-1.0/"
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

export default withRouter(Header);
