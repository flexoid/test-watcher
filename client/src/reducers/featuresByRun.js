import {
  FETCH_FEATURES_REQUEST,
  FETCH_FEATURES_SUCCESS,
  FETCH_FEATURES_FAILURE,
  FEATURE_UPDATED,
} from '../actions'

const featuresByRun = (state = {}, action) => {
  switch (action.type) {
    case FETCH_FEATURES_REQUEST:
    case FETCH_FEATURES_SUCCESS:
    case FETCH_FEATURES_FAILURE:
    case FEATURE_UPDATED:
      return { ...state, [action.testRunId]: featuresForRun(state[action.testRunId], action) }
    default:
      return state
  }
}

const featuresForRun = (state = { items: [], isFetching: false }, action) => {
  switch (action.type) {
    case FETCH_FEATURES_REQUEST:
      return { ...state, isFetching: true, error: undefined }
    case FETCH_FEATURES_SUCCESS:
      return { ...state, items: action.data.map((testCase) => testCase.id), isFetching: false }
    case FETCH_FEATURES_FAILURE:
      return { ...state, isFetching: false, error: action.error }
    case FEATURE_UPDATED:
      let items = state.items
      if (items.indexOf(action.data.id) === -1) {
        items = [action.data.id, ...state.items]
      }

      return { ...state, items: items }
    default:
      return state
  }
}

export default featuresByRun
