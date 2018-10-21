import {
  FETCH_TEST_CASES_REQUEST,
  FETCH_TEST_CASES_SUCCESS,
  FETCH_TEST_CASES_FAILURE,
  TEST_CASE_UPDATED,
} from '../actions'

const testCasesByFeature = (state = {}, action) => {
  switch (action.type) {
    case FETCH_TEST_CASES_REQUEST:
    case FETCH_TEST_CASES_SUCCESS:
    case TEST_CASE_UPDATED:
      return { ...state, [action.featureId]: testCasesForFeature(state[action.featureId], action) }
    default:
      return state
  }
}

const testCasesForFeature = (state = { items: [], isFetching: false }, action) => {
  switch (action.type) {
    case FETCH_TEST_CASES_REQUEST:
      return { ...state, isFetching: true }
    case FETCH_TEST_CASES_SUCCESS:
      return { ...state, items: action.data.map((testCase) => testCase.id), isFetching: false }
    case FETCH_TEST_CASES_FAILURE:
      return { ...state, isFetching: false, error: action.error }
    case TEST_CASE_UPDATED:
      let items = state.items
      if (items.indexOf(action.data.id) === -1) {
        items = [action.data.id, ...state.items]
      }

      return { ...state, items: items }
    default:
      return state
  }
}

export default testCasesByFeature
