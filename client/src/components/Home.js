import React, { Component } from "react";
import ProjectVisibleList from "../containers/project/VisibleList"

class Home extends Component {
  render() {
    return (
      <div className="Home columns">
        <div className="TestRuns column is-12">
          <h1 className="title">Projects</h1>

          <ProjectVisibleList />
        </div>
      </div>
    );
  }
}

export default Home;
