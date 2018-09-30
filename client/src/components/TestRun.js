import React, { Component } from 'react';
import moment from 'moment';
import CurrentTestCase from '../containers/CurrentTestCase';

class TestRun extends Component {
  componentDidMount() {
    this.props.onMount()
  }

  render() {
    const testRun = this.props.testRun
    const testCases = this.props.testCases;

    if (!testRun || !testCases) {
      return null
    }

    let testCasesList = <p>Loading steps...</p>

    if (!testCases.isFetching) {
      testCasesList =
        <ul>
          {testCases.items.map((testCase, idx) =>
            <CurrentTestCase key={testCase.id.toString()} testCaseId={testCase.id} />
          )}
        </ul>
    }

    return (
      <div className="TestRun columns">
        <div className="column is-3">
          <p className="is-size-5">{testRun.id} {testRun.name}</p>
        </div>

        <div className="column">
          <h2 className="subtitle">Test cases</h2>
          {testCasesList}
        </div>
      </div>
    );
  }
}

export default TestRun
