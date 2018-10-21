import React, { Component } from 'react';
import TestCaseCurrentItem from "../../containers/testCase/CurrentItem"

class TestCaseList extends Component {
  render() {
    return <div className="columns">
      <div className="column is-12 level">
        {this.props.testCases.items.map(testCase =>
          <TestCaseCurrentItem key={testCase.id.toString()} testCase={testCase} />
        )}
      </div>
    </div>
  }
}

export default TestCaseList
