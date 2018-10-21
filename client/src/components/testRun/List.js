import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';

class TestRunList extends Component {
  render() {
    if (this.props.isFetching) {
      return <p>Loading test runs...</p>
    }

    return (
      <ul>
        {this.props.testRuns.map(testRun =>
          <li key={testRun.id.toString()}>
            <p><Link to={`/projects/1/runs/${testRun.id}`}>Test Run {testRun.id}</Link></p>
            {testRun.finished_at ? (
              <p className="is-size-7">
                Finished <Moment fromNow>{testRun.finished_at}</Moment>
              </p>
            ) : (
              <p className="is-size-7">
                Running for <Moment fromNow ago>{testRun.created_at}</Moment>
              </p>
            )}
          </li>
        )}
      </ul>
    );
  }
}

export default TestRunList
