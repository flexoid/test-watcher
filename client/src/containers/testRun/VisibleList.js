import React, { Component } from 'react';
import { connect } from 'react-redux'
import TestRunList from "../../components/testRun/List";
import { fetchTestRuns } from '../../actions';

class TestRunVisibleList extends Component {
  componentDidMount() {
    this.props.dispatch(fetchTestRuns(this.props.project.id))
  }

  render() {
    return <TestRunList {...this.props} />
  }
}

const mapStateToProps = state => {
  return {
    testRuns: state.testRuns.items.map(testRunId => state.entities.testRuns[testRunId]),
    isFetching: state.testRuns.isFetching
  }
}

TestRunVisibleList = connect(
  mapStateToProps
)(TestRunVisibleList)

export default TestRunVisibleList
