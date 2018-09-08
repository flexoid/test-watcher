import { combineReducers } from 'redux'
import testRuns from './testRuns'
import testCases from './testCases'

export default combineReducers({
  testRuns,
  testCases
})
