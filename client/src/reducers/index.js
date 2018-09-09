import { combineReducers } from 'redux'
import testRuns from './testRuns'
import testCases from './testCases'
import entities from './entities'

export default combineReducers({
  testRuns,
  testCases,
  entities
})
