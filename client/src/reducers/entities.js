import { RECEIVE_TEST_RUNS, RECEIVE_TEST_CASES } from '../actions'
import merge from 'lodash/merge'

const entitiesById = (data) =>
  data.reduce((acc, entity) => ({ ...acc, [entity.id]: entity }), {})

const entities = (state = { testRuns: {}, testCases: {} }, action) => {
  switch (action.type) {
    case RECEIVE_TEST_RUNS:
      return merge({}, state, { testRuns: entitiesById(action.data) })
    case RECEIVE_TEST_CASES:
      return merge({}, state, { testCases: entitiesById(action.data) })
    default:
      return state
  }
}

export default entities
