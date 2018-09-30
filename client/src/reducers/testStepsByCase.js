import {
  REQUEST_TEST_STEPS,
  RECEIVE_TEST_STEPS,
  TEST_STEP_STARTED,
} from '../actions'

const testStepsByCase = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_TEST_STEPS:
    case RECEIVE_TEST_STEPS:
    case TEST_STEP_STARTED:
      return { ...state, [action.testCaseId]: testStepsForCase(state[action.testCaseId], action) }
    default:
      return state
  }
}

const testStepsForCase = (state = { items: [], isFetching: false }, action) => {
  switch (action.type) {
    case REQUEST_TEST_STEPS:
      return { ...state, isFetching: true }
    case RECEIVE_TEST_STEPS:
      return { ...state, items: action.data.map((testStep) => testStep.id), isFetching: false }
    case TEST_STEP_STARTED:
      return { ...state, items: [...state.items, action.data.id] }
    default:
      return state
  }
}

export default testStepsByCase
