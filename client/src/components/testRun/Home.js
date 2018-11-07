import React, { Component } from 'react';

class TestRunHome extends Component {
  render() {
    return <div className="tile is-ancestor has-text-centered">
      <div className="tile is-parent">
        <div className="tile is-child box">
          <p className="title">{this.props.features.items.length}</p>
          <p className="subtitle">Features</p>
        </div>
      </div>

      <div className="tile is-parent">
        <div className="tile is-child box">
          <p className="title">{this.props.testRun.test_cases_count}</p>
          <p className="subtitle">Test cases</p>
        </div>
      </div>
    </div>
  }
}

export default TestRunHome
