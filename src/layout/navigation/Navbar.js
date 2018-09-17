import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import logo from "./logo.svg";
import NavLink from "./NavLink";

export class Navbar extends Component {
  render() {
    const { location, config } = this.props;
    const { ara_version, ansible_version, python_version } = config;
    return (
      <nav className="navbar navbar-default navbar-pf">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle"
            data-toggle="collapse"
            data-target=".navbar-collapse-1"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          <Link
            to="/playbooks"
            id="navbar-navbar-header__playbooks-link"
            className="navbar-brand"
          >
            <img
              src={logo}
              alt="ARA: Ansible Run Analysis"
              width="81"
              height="32"
            />
          </Link>
        </div>
        <div className="collapse navbar-collapse navbar-collapse-1">
          <ul className="nav navbar-nav navbar-utility">
            <li>
              <a
                href="https://ara.readthedocs.io/en/latest/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Documentation
              </a>
            </li>
            {ara_version ? (
              <li>
                <a
                  href="https://github.com/openstack/ara"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <strong>ARA</strong> {ara_version}
                </a>
              </li>
            ) : null}
            {ansible_version ? (
              <li>
                <a
                  href="https://www.ansible.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <strong>Ansible</strong> {ansible_version}
                </a>
              </li>
            ) : null}
            {python_version ? (
              <li>
                <a
                  href="https://www.python.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <strong>Python</strong> {python_version}
                </a>
              </li>
            ) : null}
          </ul>
          <ul className="nav navbar-nav navbar-primary">
            <NavLink id="playbooks" to="/playbooks" location={location}>
              Playbooks reports
            </NavLink>
            <NavLink id="about" to="/about" location={location}>
              About
            </NavLink>
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    config: state.config
  };
}

export default withRouter(connect(mapStateToProps)(Navbar));
