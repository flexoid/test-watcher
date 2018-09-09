import axios from "axios";

export const SELECT_CURRENT_TEST_RUN = 'SELECT_CURRENT_TEST_RUN'
export const SET_CASES_FOR_TEST_RUN = 'SET_STEPS_FOR_TEST_RUN'

export const selectCurrentTestRun = (id) => ({
  type: SELECT_CURRENT_TEST_RUN,
  id
})

export const setCasesForTestRun = (id, casesData) => ({
  type: SET_CASES_FOR_TEST_RUN,
  id,
  casesData
})

export const REQUEST_TEST_RUNS = 'REQUEST_TEST_RUNS'
const requestTestRuns = () => ({
  type: REQUEST_TEST_RUNS
})

export const RECEIVE_TEST_RUNS = 'RECEIVE_TEST_RUNS'
const receiveTestRuns = (data) => ({
  type: RECEIVE_TEST_RUNS,
  data
})

export const fetchTestRuns = () =>
  async (dispatch) => {
    dispatch(requestTestRuns())

    try {
      const response = await axios.get("/api/v1/test_runs")
      dispatch(receiveTestRuns(response.data))
    } catch(error) {
      console.error(error)
    }
  }
