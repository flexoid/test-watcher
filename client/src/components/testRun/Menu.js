import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

class Menu extends Component {
  render() {
    return <React.Fragment>
      <p className="menu-label">
        Test run
      </p>

      <ul className="menu-list">
        <li><NavLink exact to={this.props.match.url} activeClassName="is-active">Overview</NavLink></li>
        <li><NavLink to={`${this.props.match.url}/features`} activeClassName="is-active">Features</NavLink></li>
      </ul>
    </React.Fragment>
  }
}

export default Menu
