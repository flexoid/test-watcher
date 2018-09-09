import { connect } from 'react-redux'
import TestRunList from "../components/TestRunList";

const mapStateToProps = state => {
  return {
    testRuns: state.testRuns.items.map(testRunId => state.entities.testRuns[testRunId]),
    isFetching: state.testRuns.isFetching
  }
}

// const mapDispatchToProps = (dispatch, ownProps) => {
// }

const VisibleTestRunList = connect(
  mapStateToProps
)(TestRunList)

export default VisibleTestRunList
