import React, { Component } from 'react';
import { Link } from "react-router-dom";
import moment from 'moment';

class TestRunList extends Component {
  render() {
    if (this.props.isFetching) {
      return <p>Loading test runs...</p>
    }

    return (
      <ul>
        {this.props.testRuns.map(testRun =>
          <li key={testRun.id.toString()}>
            <p><Link to={`/runs/${testRun.id}`}>{testRun.id} {testRun.name}</Link></p>
            <p className="is-size-7">{moment(testRun.created_at).format()}</p>
          </li>
        )}
      </ul>
    );
  }
}

export default TestRunList
