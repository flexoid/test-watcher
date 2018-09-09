import { connect } from 'react-redux'
import TestRun from "../components/TestRun"
import { fetchTestCases } from "../actions"

const testRunId = (ownProps) =>
  parseInt(ownProps.match.params.testRunId, 10)

const testCases = (testRunId, state) => {
  const testCasesForCurrentRun = state.testCasesByRun[testRunId]
  if (!testCasesForCurrentRun) { return }

  const items = testCasesForCurrentRun.items
    .map((testCaseId) => state.entities.testCases[testCaseId])

  return { ...testCasesForCurrentRun, items: items }
}

const mapStateToProps = (state, ownProps) => {
  return {
    testRun: state.entities.testRuns[testRunId(ownProps)],
    testCases: testCases(testRunId(ownProps), state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onMount: () =>
      dispatch(fetchTestCases(testRunId(ownProps)))
  }
}

const CurrentTestRun = connect(
  mapStateToProps,
  mapDispatchToProps
)(TestRun)

export default CurrentTestRun
