import axios from "axios";

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

export const REQUEST_TEST_CASES = 'REQUEST_TEST_CASES'
const requestTestCases = (testRunId) => ({
  type: REQUEST_TEST_CASES,
  testRunId
})

export const RECEIVE_TEST_CASES = 'RECEIVE_TEST_CASES'
const receiveTestCases = (testRunId, data) => ({
  type: RECEIVE_TEST_CASES,
  testRunId,
  data
})

export const fetchTestCases = (testRunId) =>
  async (dispatch) => {
    dispatch(requestTestCases(testRunId))

    try {
      const response = await axios.get(`/api/v1/test_runs/${testRunId}/test_cases`);
      dispatch(receiveTestCases(testRunId, response.data))
    } catch(error) {
      console.error(error)
    }
  }

  export const REQUEST_TEST_STEPS = 'REQUEST_TEST_STEPS'
  const requestTestSteps = (testCaseId) => ({
    type: REQUEST_TEST_STEPS,
    testCaseId
  })

  export const RECEIVE_TEST_STEPS = 'RECEIVE_TEST_STEPS'
  const receiveTestSteps = (testCaseId, data) => ({
    type: RECEIVE_TEST_STEPS,
    testCaseId,
    data
  })

  export const fetchTestSteps = (testCaseId) =>
  async (dispatch) => {
    dispatch(requestTestSteps(testCaseId))

    try {
      const response = await axios.get(`/api/v1/test_cases/${testCaseId}/test_steps`);
      dispatch(receiveTestSteps(testCaseId, response.data))
    } catch(error) {
      console.error(error)
    }
  }

  export const SELECT_CURRENT_TEST_RUN = 'SELECT_CURRENT_TEST_RUN'

  export const selectCurrentTestRun = (id) => ({
    type: SELECT_CURRENT_TEST_RUN,
    id
  })

export const TOGGLE_STEPS_FOR_TEST_CASE = 'TOGGLE_STEPS_FOR_TEST_CASE'
export const toggleStepsForTestCase = (testCaseId) => ({
  type: TOGGLE_STEPS_FOR_TEST_CASE,
  testCaseId
})
