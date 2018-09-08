import { SET_CASES_FOR_TEST_RUN } from '../actions'

const testCases = (state = {}, action) => {
  switch (action.type) {
    case SET_CASES_FOR_TEST_RUN:
      return { ...state, [action.id]: action.casesData }
    default:
      return state
  }
}

export default testCases
