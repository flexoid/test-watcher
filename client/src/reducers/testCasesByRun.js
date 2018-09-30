import {
  REQUEST_TEST_CASES,
  RECEIVE_TEST_CASES,
  TEST_CASE_STARTED
} from '../actions'

const testCasesByRun = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_TEST_CASES:
    case RECEIVE_TEST_CASES:
    case TEST_CASE_STARTED:
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
    case TEST_CASE_STARTED:
      return { ...state, items: [...state.items, action.data.id] }
    default:
      return state
  }
}

export default testCasesByRun
