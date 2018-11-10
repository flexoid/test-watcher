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
      <div className="column is-12">
        <Route exact path={this.props.match.url} render={withLayoutProps(TestRunCurrentHome)} />
        <Route path={`${this.props.match.url}/features`} render={withLayoutProps(TestRunFeatures)} />
      </div>
    </div>
  }
}

export default TestRunLayout
