import { TOGGLE_STEPS_FOR_TEST_CASE } from "../actions"

const currentTestRun = (state = { testCases: {} }, action) => {
  switch (action.type) {
    case TOGGLE_STEPS_FOR_TEST_CASE:
      return {
        ...state,
        testCases: {
          ...state.testCases,
          [action.testCaseId]: {
            ...state.testCases[action.testCaseId],
            showSteps: !(state.testCases[action.testCaseId] && state.testCases[action.testCaseId].showSteps)
          }
        }
      }
    default:
      return state
  }
}

export default currentTestRun
