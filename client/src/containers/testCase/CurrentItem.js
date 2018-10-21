import { connect } from 'react-redux'
import TestCaseItem from "../../components/testCase/Item"
import { fetchTestSteps } from "../../actions"

const testSteps = (testCaseId, state) => {
  const testStepsByCase = state.testStepsByCase[testCaseId]
  if (!testStepsByCase) { return }

  const items = testStepsByCase.items
    .map((testStepId) => state.entities.testSteps[testStepId])

  return { ...testStepsByCase, items: items }
}

const mapStateToProps = (state, ownProps) => {
  return {
    testSteps: testSteps(ownProps.testCase.id, state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchTestSteps: () =>
      dispatch(fetchTestSteps(ownProps.testCase.id))
  }
}

const TestCaseCurrentItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(TestCaseItem)

export default TestCaseCurrentItem
