import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import logo from "./logo.svg";

const AraImg = styled.img`
  height: 45px;
`;

export class NavLink extends Component {
  render() {
    const { to, className, location, children, ...rest } = this.props;
    return (
      <Link
        to={to}
        className={`${className} ${
          location.pathname.indexOf(to) === -1 ? "" : "pf-m-current"
        }`}
        {...rest}
      >
        {children}
      </Link>
    );
  }
}

export class Header extends Component {
  render() {
    const { location } = this.props;
    return (
      <header role="banner" className="pf-c-page__header">
        <div className="pf-c-page__header-brand">
          <Link to="/playbooks" className="pf-c-page__header-brand-link">
            <AraImg className="pf-c-brand" src={logo} alt="Ara Logo" />
          </Link>
        </div>
        <div className="pf-c-page__header-nav">
          <nav
            className="pf-c-nav"
            id="page-layout-horizontal-nav-horizontal-nav"
            aria-label="Horizontal Nav Example"
          >
            <ul className="pf-c-nav__horizontal-list">
              <li className="pf-c-nav__item">
                <NavLink
                  to="/playbooks"
                  className="pf-c-nav__link"
                  location={location}
                >
                  Playbooks
                </NavLink>
              </li>
              <li className="pf-c-nav__item">
                <a
                  href="https://ara.readthedocs.io/en/latest/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pf-c-nav__link"
                >
                  Documentation
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}

export default withRouter(Header);
