import React, { Component } from 'react';
import TestRunVisibleList from "../../containers/testRun/VisibleList"

class ProjectHome extends Component {
  render() {
    return <div className="columns">
      <div className="column is-12">
        <h2 className="subtitle">Test runs</h2>

        <TestRunVisibleList />
      </div>
    </div>
  }
}

export default ProjectHome
