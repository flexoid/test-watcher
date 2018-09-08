export const SET_TEST_RUNS = 'SET_TEST_RUNS'
export const SELECT_CURRENT_TEST_RUN = 'SELECT_CURRENT_TEST_RUN'
export const SET_CASES_FOR_TEST_RUN = 'SET_STEPS_FOR_TEST_RUN'

export const setTodosList = (data) => ({
  type: SET_TEST_RUNS,
  data
})

export const selectCurrentTestRun = (id) => ({
  type: SELECT_CURRENT_TEST_RUN,
  id
})

export const setCasesForTestRun = (id, casesData) => ({
  type: SET_CASES_FOR_TEST_RUN,
  id,
  casesData
})
