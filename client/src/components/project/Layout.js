import React, { Component } from 'react';
import { Route, NavLink, Switch } from "react-router-dom";
import CurrentHome from "../../containers/project/CurrentHome"
import ProjectTestRuns from "./TestRuns"
import TestRunCurrent from "../../containers/testRun/Current"
import TestRunMenu from "../testRun/Menu"

class ProjectLayout extends Component {
  render() {
    if (!this.props.project) {
      return <p>Loading...</p>
    }

    const withProject = (ComponentWithProject) =>
      (props) => <ComponentWithProject project={this.props.project} {...props} />

    return <div className="columns">
      <div className="column is-3">
        <aside className="menu">
          <p className="menu-label">
            {this.props.project.name}
          </p>
          <ul className="menu-list">
            <li><NavLink exact to={this.props.match.url} activeClassName="is-active">Overview</NavLink></li>
            <li><NavLink exact to={`${this.props.match.url}/runs`} activeClassName="is-active">Test Runs</NavLink></li>
          </ul>

          <Route path={`${this.props.match.url}/runs/:testRunId`} component={TestRunMenu} />
        </aside>
      </div>
      <div className="column is-9">
        <Switch>
          <Route path={`${this.props.match.url}/runs/:testRunId`} render={withProject(TestRunCurrent)} />
          <Route path={`${this.props.match.url}/runs`} render={withProject(ProjectTestRuns)} />
          <Route path={this.props.match.url} render={withProject(CurrentHome)} />
        </Switch>
      </div>
    </div>
  }
}

export default ProjectLayout
