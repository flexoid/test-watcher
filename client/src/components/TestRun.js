import React, { Component } from 'react';
import { connect } from "react-redux"
import axios from "axios";
import moment from 'moment';
import TestCase from './TestCase';
import { selectCurrentTestRun, setCasesForTestRun } from '../actions'

class TestRun extends Component {
  async componentDidMount() {
    const testRunId = parseInt(this.props.match.params.testRunId);
    this.props.dispatch(selectCurrentTestRun(testRunId));

    const testRunResponse = await axios.get(`/api/v1/test_runs/${testRunId}`);
    const testCasesResponse = await axios.get(`/api/v1/test_runs/${testRunId}/test_cases`);

    this.props.dispatch(setCasesForTestRun(testRunId, testCasesResponse.data));
  }

  render() {
    const testRunId = this.props.testRuns.current;
    const testRun = this.props.testRuns.all.find(run => run.id == testRunId);

    if (!testRun) { return null; }

    const testCases = this.props.testCases[testRunId] || [];

    const testCasesList = testCases.map((testCase, idx) =>
      <TestCase key={testCase.id.toString()} testCase={testCase} />
    );

    return (
      <div className="TestRun columns">
        <div className="column is-3">
          <p className="is-size-5">{testRun.id} {testRun.name}</p>
          <p className="is-size-7">{moment(testRun.created_at).format()}</p>
        </div>

        <div className="column">
          <h2 className="subtitle">Test cases</h2>
          <ul>{testCasesList}</ul>
        </div>
      </div>
    );
  }
}

export default connect(state =>
  ({ testRuns: state.testRuns, testCases: state.testCases })
)(TestRun);
