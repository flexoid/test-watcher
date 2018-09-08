import { SET_TEST_RUNS } from '../actions'

const testRuns = (state = [], action) => {
  switch (action.type) {
    case SET_TEST_RUNS:
      return action.data
    default:
      return state
  }
}

export default testRuns
