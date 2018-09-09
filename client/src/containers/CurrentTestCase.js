import { connect } from 'react-redux'
import TestCase from "../components/TestCase"
import { fetchTestSteps, toggleStepsForTestCase } from "../actions"

const testSteps = (testCaseId, state) => {
  const testStepsForCurrentRun = state.testStepsByCase[testCaseId]
  if (!testStepsForCurrentRun) { return }

  const items = testStepsForCurrentRun.items
    .map((testStepId) => state.entities.testSteps[testStepId])

  return { ...testStepsForCurrentRun, items: items }
}

const mapStateToProps = (state, ownProps) => {
  return {
    testCase: state.entities.testCases[ownProps.testCaseId],
    testSteps: testSteps(ownProps.testCaseId, state),
    currentTestRun: state.currentTestRun
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleSteps: () => {
      dispatch(toggleStepsForTestCase(ownProps.testCaseId))
      dispatch(fetchTestSteps(ownProps.testCaseId))
    }
  }
}

const CurrentTestCase = connect(
  mapStateToProps,
  mapDispatchToProps
)(TestCase)

export default CurrentTestCase
