import { TOGGLE_STEPS_FOR_TEST_CASE } from "../actions"

const currentTestRun = (state = { testCases: {} }, action) => {
  switch (action.type) {
    case TOGGLE_STEPS_FOR_TEST_CASE:
      return {
        ...state,
        testCases: {
          ...state.testCases,
          [action.testCaseId]: testCasesForCurrentTestRun(state.testCases[action.testCaseId], action)
        }
      }
    default:
      return state
  }
}

const testCasesForCurrentTestRun = (state = { showSteps: false }, action) => {
  switch (action.type) {
    case TOGGLE_STEPS_FOR_TEST_CASE:
      return { ...state, showSteps: !state.showSteps }
    default:
      return state
  }
}

export default currentTestRun
