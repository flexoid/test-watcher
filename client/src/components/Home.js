import React, { Component } from "react";
import TestRunList from "./TestRunList";

class Home extends Component {
  render() {
    return (
      <div className="Home columns">
        <div className="TestRuns column is-8">
          <h2 className="subtitle">Test runs</h2>

          <TestRunList />
        </div>
      </div>
    );
  }
}

export default Home;
