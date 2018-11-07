import React, { Component } from 'react';
import { Route, NavLink } from "react-router-dom";
import TestRunCurrentHome from "../../containers/testRun/CurrentHome"
import TestRunFeatures from "./Features"

class TestRunLayout extends Component {
  render() {
    if (!this.props.testRun || !this.props.features) {
      return <p>Loading...</p>
    }

    const withLayoutProps = (ComponentWithProps) =>
      (props) => <ComponentWithProps
                  testRun={this.props.testRun}
                  features={this.props.features}
                  {...props} />

    return <div className="columns">
      <div className="column is-3">
        <aside className="menu">
          <p className="menu-label">
            Test Run
          </p>
          <ul className="menu-list">
            <li><NavLink exact to={this.props.match.url} activeClassName="is-active">Overview</NavLink></li>
            <li><NavLink to={`${this.props.match.url}/features`} activeClassName="is-active">Features</NavLink></li>
          </ul>
        </aside>
      </div>
      <div className="column is-9">
        <Route exact path={this.props.match.url} render={withLayoutProps(TestRunCurrentHome)} />
        <Route path={`${this.props.match.url}/features`} render={withLayoutProps(TestRunFeatures)} />
      </div>
    </div>
  }
}

export default TestRunLayout
