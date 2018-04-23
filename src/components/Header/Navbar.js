import React from "react";
import logo from "./logo.svg";

export default class Navbar extends React.Component {
  render() {
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
          <a className="navbar-brand" href="/reports/">
            <img
              src={logo}
              alt="ARA: Ansible Run Analysis"
              width="81"
              height="32"
            />
          </a>
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
            <li>
              <a
                href="https://github.com/openstack/ara"
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong>ARA</strong> 1.0.0
              </a>
            </li>
            <li>
              <a
                href="https://www.ansible.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong>Ansible</strong> 2.3.1.0
              </a>
            </li>
            <li>
              <a
                href="https://www.python.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong>Python</strong> 2.7
              </a>
            </li>
          </ul>
          <ul className="nav navbar-nav navbar-primary">
            <li className="active">
              <a href="/reports/">Playbook reports</a>
            </li>
            <li>
              <a href="/about/">About</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
