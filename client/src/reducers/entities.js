import {
  RECEIVE_TEST_RUNS,
  RECEIVE_TEST_CASES,
  RECEIVE_TEST_STEPS,
  TEST_RUN_STARTED,
  TEST_CASE_STARTED,
  TEST_CASE_FINISHED,
  TEST_STEP_STARTED,
  TEST_STEP_FINISHED,
} from '../actions'
import merge from 'lodash/merge'

const entitiesById = (data) =>
  data.reduce((acc, entity) => ({ ...acc, [entity.id]: entity }), {})

const entities = (state = { testRuns: {}, testCases: {}, testSteps: {} }, action) => {
  switch (action.type) {
    case RECEIVE_TEST_RUNS:
      return merge({}, state, { testRuns: entitiesById(action.data) })
    case TEST_RUN_STARTED:
      return merge({}, state, { testRuns: { [action.data.id]: action.data } })
    case RECEIVE_TEST_CASES:
      return merge({}, state, { testCases: entitiesById(action.data) })
    case TEST_CASE_STARTED:
    case TEST_CASE_FINISHED:
      return merge({}, state, { testCases: { [action.data.id]: action.data } })
    case RECEIVE_TEST_STEPS:
      return merge({}, state, { testSteps: entitiesById(action.data) })
    case TEST_STEP_STARTED:
    case TEST_STEP_FINISHED:
      return merge({}, state, { testSteps: { [action.data.id]: action.data } })
    default:
      return state
  }
}

export default entities
