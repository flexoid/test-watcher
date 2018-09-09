import { REQUEST_TEST_RUNS, RECEIVE_TEST_RUNS, SELECT_CURRENT_TEST_RUN } from '../actions'

const testRuns = (state = { items: [], isFetching: false }, action) => {
  switch (action.type) {
    case REQUEST_TEST_RUNS:
      return { ...state, isFetching: true }
    case RECEIVE_TEST_RUNS:
      return { ...state, items: action.data.map((testRun) => testRun.id), isFetching: false }
    case SELECT_CURRENT_TEST_RUN:
      return { ...state, current: action.id }
    default:
      return state
  }
}

export default testRuns
