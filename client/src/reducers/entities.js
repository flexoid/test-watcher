import {
  FETCH_PROJECTS_SUCCESS,
  FETCH_TEST_RUNS_SUCCESS,
  FETCH_TEST_RUN_SUCCESS,
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

const testCaseUpdated = (state, action) => {
  let testCase = action.data
  let stateChange = { testCases: { [action.data.id]: testCase } }

  // Not a new test case, no need to update counter.
  if (state.testCases[testCase.id]) { return stateChange }

  let feature = state.features[testCase.feature_id]
  if (!feature) { return stateChange }

  let testRun = state.testRuns[feature.test_run_id]
  if (!testRun) { return stateChange }

  let testCasesCount = (testRun.test_cases_count || 0) + 1
  stateChange.testRuns = { [testRun.id]: { test_cases_count: testCasesCount } }

  return stateChange
}

const entities = (state = { projects: {}, testRuns: {}, features: {}, testCases: {}, testSteps: {} }, action) => {
  switch (action.type) {
    case FETCH_PROJECTS_SUCCESS:
      return merge({}, state, { projects: entitiesById(action.data) })
    case FETCH_TEST_RUNS_SUCCESS:
      return merge({}, state, { testRuns: entitiesById(action.data) })
    case TEST_RUN_UPDATED:
    case FETCH_TEST_RUN_SUCCESS:
      return merge({}, state, { testRuns: { [action.data.id]: action.data } })
    case FETCH_FEATURES_SUCCESS:
      return merge({}, state, { features: entitiesById(action.data) })
    case FEATURE_UPDATED:
      return merge({}, state, { features: { [action.data.id]: action.data } })
    case FETCH_TEST_CASES_SUCCESS:
      return merge({}, state, { testCases: entitiesById(action.data) })
    case TEST_CASE_UPDATED:
      return merge({}, state, testCaseUpdated(state, action))
    case FETCH_TEST_STEPS_SUCCESS:
      return merge({}, state, { testSteps: entitiesById(action.data) })
    case TEST_STEP_UPDATED:
      return merge({}, state, { testSteps: { [action.data.id]: action.data } })
    default:
      return state
  }
}

export default entities
