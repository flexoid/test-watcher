import {
  FETCH_TEST_RUNS_REQUEST,
  FETCH_TEST_RUNS_SUCCESS,
  FETCH_TEST_RUNS_FAILURE,
  SELECT_CURRENT_TEST_RUN,
  TEST_RUN_UPDATED,
} from '../actions'

const testRuns = (state = { items: [], isFetching: false }, action) => {
  switch (action.type) {
    case FETCH_TEST_RUNS_REQUEST:
      return { ...state, isFetching: true }
    case FETCH_TEST_RUNS_SUCCESS:
      return { ...state, items: action.data.map((testRun) => testRun.id), isFetching: false }
    case FETCH_TEST_RUNS_FAILURE:
      return { ...state, isFetching: false, error: action.error }
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
