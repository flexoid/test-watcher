import { combineReducers } from 'redux'
import testRuns from './testRuns'
import testCasesByRun from './testCasesByRun'
import testStepsByCase from './testStepsByCase'
import currentTestRun from './currentTestRun'
import entities from './entities'

export default combineReducers({
  testRuns,
  testCasesByRun,
  testStepsByCase,
  currentTestRun,
  entities
})
