import { REQUEST_TEST_CASES, RECEIVE_TEST_CASES } from '../actions'

const testCasesByRun = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_TEST_CASES:
    case RECEIVE_TEST_CASES:
      return { ...state, [action.testRunId]: testCaseForRun(state[action.testRunId], action) }
    default:
      return state
  }
}

const testCaseForRun = (state = { items: [], isFetching: false }, action) => {
  switch (action.type) {
    case REQUEST_TEST_CASES:
      return { ...state, isFetching: true }
    case RECEIVE_TEST_CASES:
      return { ...state, items: action.data.map((testCase) => testCase.id), isFetching: false }
    default:
      return state
  }
}

export default testCasesByRun
