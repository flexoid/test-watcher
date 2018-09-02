import React, { Component } from 'react';
import axios from "axios";
import moment from 'moment';

class TestRun extends Component {
  constructor(props) {
    super(props);
    this.state = { testRun: null, testCases: [] }
  }

  async componentDidMount() {
    const testRunId = this.props.match.params.testRunId;

    const testRunResponse = await axios.get(`/api/v1/test_runs/${testRunId}`)
    const testCasesResponse = await axios.get(`/api/v1/test_runs/${testRunId}/test_cases`)

    this.setState({ testRun: testRunResponse.data, testCases: testCasesResponse.data });
  }

  render() {
    if (!this.state.testRun) { return null; }

    const testCases = this.state.testCases.map((testCase, idx) =>
      <li key={testCase.id.toString()}>
        <p>{testCase.name}</p>
        <p className="is-size-7">{testCase.duration} sec</p>
        <p className="is-size-7">{testCase.status}</p>
      </li>
    );

    return (
      <div className="TestRun columns">
        <div className="column is-3">
          <p className="is-size-5">{this.state.testRun.name}</p>
          <p className="is-size-7">{moment(this.state.testRun.created_at).format()}</p>
        </div>

        <div className="column">
          <h2 className="subtitle">Test cases</h2>
          <ul>{testCases}</ul>
        </div>
      </div>
    );
  }
}

export default TestRun;
