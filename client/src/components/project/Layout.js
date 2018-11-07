import React, { Component } from 'react';
import { Route } from "react-router-dom";
import CurrentHome from "../../containers/project/CurrentHome"
import TestRunCurrent from "../../containers/testRun/Current"

class ProjectLayout extends Component {
  render() {
    if (!this.props.project) {
      return <p>Loading...</p>
    }

    const withProject = (ComponentWithProject) =>
      (props) => <ComponentWithProject project={this.props.project} {...props} />

    return <div className="ProjectLayout">
      <Route path={`${this.props.match.url}/runs/:testRunId`} render={withProject(TestRunCurrent)} />
      <Route exact path={this.props.match.url} render={withProject(CurrentHome)} />
    </div>
  }
}

export default ProjectLayout
