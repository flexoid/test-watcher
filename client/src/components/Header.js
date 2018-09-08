import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <nav className="navbar" aria-label="main navigation">
        <div className="navbar-brand">
          <div className="navbar-item">
            <b>Test Watcher App</b>
          </div>

          <Link to="/" className="navbar-item">
            Home
          </Link>
        </div>
      </nav>
    );
  }
}

export default Header;
