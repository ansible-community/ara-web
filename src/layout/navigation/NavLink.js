import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class NavLink extends Component {
  render() {
    const { id, to, location, children, ...rest } = this.props;
    return (
      <li className={location.pathname === to ? "active" : ""}>
        <Link to={to} id={`navbar-navbar-primary__${id}-link`} {...rest}>
          {children}
        </Link>
      </li>
    );
  }
}
