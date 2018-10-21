import {
  FETCH_PROJECTS_SUCCESS,
  FETCH_TEST_RUNS_SUCCESS,
  FETCH_FEATURES_SUCCESS,
  FETCH_TEST_CASES_SUCCESS,
  FETCH_TEST_STEPS_SUCCESS,
  TEST_RUN_UPDATED,
  FEATURE_UPDATED,
  TEST_CASE_UPDATED,
  TEST_STEP_UPDATED,
} from '../actions'
import merge from 'lodash/merge'

const entitiesById = (data) =>
  data.reduce((acc, entity) => ({ ...acc, [entity.id]: entity }), {})

const entities = (state = { projects: {}, testRuns: {}, features: {}, testCases: {}, testSteps: {} }, action) => {
  switch (action.type) {
    case FETCH_PROJECTS_SUCCESS:
      return merge({}, state, { projects: entitiesById(action.data) })
    case FETCH_TEST_RUNS_SUCCESS:
      return merge({}, state, { testRuns: entitiesById(action.data) })
    case TEST_RUN_UPDATED:
      return merge({}, state, { testRuns: { [action.data.id]: action.data } })
    case FETCH_FEATURES_SUCCESS:
      return merge({}, state, { features: entitiesById(action.data) })
    case FEATURE_UPDATED:
      return merge({}, state, { features: { [action.data.id]: action.data } })
    case FETCH_TEST_CASES_SUCCESS:
      return merge({}, state, { testCases: entitiesById(action.data) })
    case TEST_CASE_UPDATED:
      return merge({}, state, { testCases: { [action.data.id]: action.data } })
    case FETCH_TEST_STEPS_SUCCESS:
      return merge({}, state, { testSteps: entitiesById(action.data) })
    case TEST_STEP_UPDATED:
      return merge({}, state, { testSteps: { [action.data.id]: action.data } })
    default:
      return state
  }
}

export default entities
