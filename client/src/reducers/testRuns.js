import { SET_TEST_RUNS, SELECT_CURRENT_TEST_RUN } from '../actions'

const testRuns = (state = { all: [], current: null }, action) => {
  switch (action.type) {
    case SET_TEST_RUNS:
      return { ...state, all: action.data }
    case SELECT_CURRENT_TEST_RUN:
      return { ...state, current: action.id }
    default:
      return state
  }
}

export default testRuns
