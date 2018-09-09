import { RECEIVE_TEST_RUNS } from '../actions'

const entities = (state = { testRuns: {}, testCases: {} }, action) => {
  switch (action.type) {
    case RECEIVE_TEST_RUNS:
      return {
        ...state,
        testRuns: action.data.reduce((acc, testRun) => ({ ...acc, [testRun.id]: testRun }), {})
      }
    default:
      return state
  }
}

export default entities
