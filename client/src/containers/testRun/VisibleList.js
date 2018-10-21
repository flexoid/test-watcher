import { connect } from 'react-redux'
import TestRunList from "../../components/testRun/List";

const mapStateToProps = state => {
  return {
    testRuns: state.testRuns.items.map(testRunId => state.entities.testRuns[testRunId]),
    isFetching: state.testRuns.isFetching
  }
}

const VisibleTestRunList = connect(
  mapStateToProps
)(TestRunList)

export default VisibleTestRunList
