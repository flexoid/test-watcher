import {
  REQUEST_TEST_RUNS,
  RECEIVE_TEST_RUNS,
  SELECT_CURRENT_TEST_RUN,
  TEST_RUN_UPDATED,
} from '../actions'

const testRuns = (state = { items: [], isFetching: false }, action) => {
  switch (action.type) {
    case REQUEST_TEST_RUNS:
      return { ...state, isFetching: true }
    case RECEIVE_TEST_RUNS:
      return { ...state, items: action.data.map((testRun) => testRun.id), isFetching: false }
    case SELECT_CURRENT_TEST_RUN:
      return { ...state, current: action.id }
    case TEST_RUN_UPDATED:
      let items = state.items
      if (items.indexOf(action.data.id) === -1) {
        items = [action.data.id, ...state.items]
      }

      return { ...state, items: items }
    default:
      return state
  }
}

export default testRuns
