import { REQUEST_TEST_STEPS, RECEIVE_TEST_STEPS } from '../actions'

const testStepsByCase = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_TEST_STEPS:
    case RECEIVE_TEST_STEPS:
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
    default:
      return state
  }
}

export default testStepsByCase
