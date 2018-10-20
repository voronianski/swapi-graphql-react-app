import React from "react";
import { NavLink } from "react-router-dom";

import logo from "../logo.svg";

const Header = () => (
  <header className="header">
    <a
      href="https://graphiql.graphcms.com/simple/v1/swapi"
      className="header-logo right"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src={logo} alt="GraphCMS logo" className="header-logo-image" />
    </a>
    <nav className="header-nav center absolute top-0 left-0 right-0 bottom-0 clearfix h6 white">
      <NavLink
        exact
        to="/"
        className="header-nav-link btn btn-outline btn-small regular caps rounded-left"
        activeClassName="is-active btn-primary bg-white black"
      >
        Search
      </NavLink>
      <NavLink
        to="/history"
        className="header-nav-link btn btn-outline btn-small regular caps rounded-right border-left-0"
        activeClassName="is-active btn-primary bg-white black"
      >
        History
      </NavLink>
    </nav>
  </header>
);

export default Header;
