import axios from "axios";

export const FETCH_PROJECTS_REQUEST = 'FETCH_PROJECTS_REQUEST'
export const FETCH_PROJECTS_SUCCESS = 'FETCH_PROJECTS_SUCCESS'
export const FETCH_PROJECTS_FAILURE = 'FETCH_PROJECTS_FAILURE'

export const fetchProjects = () =>
  async (dispatch) => {
    dispatch({ type: FETCH_PROJECTS_REQUEST })

    try {
      const response = await axios.get("/api/v1/projects")
      dispatch({ type: FETCH_PROJECTS_SUCCESS, data: response.data })
    } catch(error) {
      dispatch({ type: FETCH_PROJECTS_FAILURE, error: error })
    }
  }

export const FETCH_TEST_RUNS_REQUEST = 'FETCH_TEST_RUNS_REQUEST'
export const FETCH_TEST_RUNS_SUCCESS = 'FETCH_TEST_RUNS_SUCCESS'
export const FETCH_TEST_RUNS_FAILURE = 'FETCH_TEST_RUNS_FAILURE'

export const fetchTestRuns = (projectId) =>
  async (dispatch) => {
    dispatch({ type: FETCH_TEST_RUNS_REQUEST, projectId })

    try {
      const response = await axios.get(`/api/v1/projects/${projectId}/test_runs`)
      dispatch({ type: FETCH_TEST_RUNS_SUCCESS, projectId, data: response.data })
    } catch(error) {
      dispatch({ type: FETCH_TEST_RUNS_FAILURE, projectId, error: error })
    }
  }

export const FETCH_TEST_RUN_REQUEST = 'FETCH_TEST_RUN_REQUEST'
export const FETCH_TEST_RUN_SUCCESS = 'FETCH_TEST_RUN_SUCCESS'
export const FETCH_TEST_RUN_FAILURE = 'FETCH_TEST_RUN_FAILURE'

export const fetchTestRun = (testRunId) =>
  async (dispatch) => {
    dispatch({ type: FETCH_TEST_RUN_REQUEST, testRunId })

    try {
      const response = await axios.get(`/api/v1/test_runs/${testRunId}`)
      dispatch({ type: FETCH_TEST_RUN_SUCCESS, testRunId, data: response.data })
    } catch(error) {
      dispatch({ type: FETCH_TEST_RUN_FAILURE, testRunId, error: error })
    }
  }

export const FETCH_FEATURES_REQUEST = 'FETCH_FEATURES_REQUEST'
export const FETCH_FEATURES_SUCCESS = 'FETCH_FEATURES_SUCCESS'
export const FETCH_FEATURES_FAILURE = 'FETCH_FEATURES_FAILURE'

export const fetchFeatures = (testRunId) =>
  async (dispatch) => {
    dispatch({ type: FETCH_FEATURES_REQUEST, testRunId })

    try {
      const response = await axios.get(`/api/v1/test_runs/${testRunId}/features`)
      dispatch({ type: FETCH_FEATURES_SUCCESS, testRunId, data: response.data })
    } catch(error) {
      dispatch({ type: FETCH_FEATURES_FAILURE, testRunId, error: error })
    }
  }

export const FETCH_TEST_CASES_REQUEST = 'FETCH_TEST_CASES_REQUEST'
export const FETCH_TEST_CASES_SUCCESS = 'FETCH_TEST_CASES_SUCCESS'
export const FETCH_TEST_CASES_FAILURE = 'FETCH_TEST_CASES_FAILURE'

export const fetchTestCases = (featureId) =>
  async (dispatch) => {
    dispatch({ type: FETCH_TEST_CASES_REQUEST, featureId })

    try {
      const response = await axios.get(`/api/v1/features/${featureId}/test_cases`)
      dispatch({ type: FETCH_TEST_CASES_SUCCESS, featureId, data: response.data })
    } catch(error) {
      dispatch({ type: FETCH_TEST_CASES_FAILURE, error: error })
    }
  }

export const FETCH_TEST_STEPS_REQUEST = 'FETCH_TEST_STEPS_REQUEST'
export const FETCH_TEST_STEPS_SUCCESS = 'FETCH_TEST_STEPS_SUCCESS'
export const FETCH_TEST_STEPS_FAILURE = 'FETCH_TEST_STEPS_FAILURE'

export const fetchTestSteps = (testCaseId) =>
  async (dispatch) => {
    dispatch({ type: FETCH_TEST_STEPS_REQUEST, testCaseId })

    try {
      const response = await axios.get(`/api/v1/test_cases/${testCaseId}/test_steps`)
      dispatch({ type: FETCH_TEST_STEPS_SUCCESS, testCaseId, data: response.data })
    } catch(error) {
      dispatch({ type: FETCH_TEST_STEPS_FAILURE, error: error })
    }
  }

export const SELECT_CURRENT_TEST_RUN = 'SELECT_CURRENT_TEST_RUN'

export const selectCurrentTestRun = (id) => ({
  type: SELECT_CURRENT_TEST_RUN,
  id
})

export const TEST_RUN_UPDATED  = 'TEST_RUN_UPDATED'
export const FEATURE_UPDATED   = 'FEATURE_UPDATED'
export const TEST_CASE_UPDATED = 'TEST_CASE_UPDATED'
export const TEST_STEP_UPDATED = 'TEST_STEP_UPDATED'
