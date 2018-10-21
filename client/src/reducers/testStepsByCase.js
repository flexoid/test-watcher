import {
  FETCH_TEST_STEPS_REQUEST,
  FETCH_TEST_STEPS_SUCCESS,
  FETCH_TEST_STEPS_FAILURE,
  TEST_STEP_UPDATED,
} from '../actions'

const testStepsByCase = (state = {}, action) => {
  switch (action.type) {
    case FETCH_TEST_STEPS_REQUEST:
    case FETCH_TEST_STEPS_SUCCESS:
    case FETCH_TEST_STEPS_FAILURE:
    case TEST_STEP_UPDATED:
      return { ...state, [action.testCaseId]: testStepsForCase(state[action.testCaseId], action) }
    default:
      return state
  }
}

const testStepsForCase = (state = { items: [], isFetching: false }, action) => {
  switch (action.type) {
    case FETCH_TEST_STEPS_REQUEST:
      return { ...state, isFetching: true }
    case FETCH_TEST_STEPS_SUCCESS:
      return { ...state, items: action.data.map((testStep) => testStep.id), isFetching: false }
    case FETCH_TEST_STEPS_FAILURE:
      return { ...state, isFetching: false, error: action.error }
    case TEST_STEP_UPDATED:
      let items = state.items
      if (items.indexOf(action.data.id) === -1) {
        items = [...state.items, action.data.id]
      }

      return { ...state, items: items }
    default:
      return state
  }
}

export default testStepsByCase
