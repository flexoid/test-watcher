import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux"
import moment from 'moment';

class TestRunList extends Component {
  render() {
    if (this.props.testRuns.isFetching) {
      return <p>Loading test runs...</p>
    }

    return (
      <ul>
        {this.props.testRuns.items.map(testRunId => {
          const testRun = this.props.entities.testRuns[testRunId]

          return <li key={testRun.id.toString()}>
            <p><Link to={`/runs/${testRunId}`}>{testRunId} {testRun.name}</Link></p>
            <p className="is-size-7">{moment(testRun.created_at).format()}</p>
          </li>
        })}
      </ul>
    );
  }
}

export default connect(state => ({ testRuns: state.testRuns, entities: state.entities }))(TestRunList);
