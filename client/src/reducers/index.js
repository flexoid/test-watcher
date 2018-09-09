import { combineReducers } from 'redux'
import testRuns from './testRuns'
import testCasesByRun from './testCasesByRun'
import entities from './entities'

export default combineReducers({
  testRuns,
  testCasesByRun,
  entities
})
