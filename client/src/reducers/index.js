import { combineReducers } from 'redux'
import testRuns from './testRuns'
import featuresByRun from './featuresByRun'
import testCasesByFeature from './testCasesByFeature'
import testStepsByCase from './testStepsByCase'
import entities from './entities'
import project from './project'

export default combineReducers({
  testRuns,
  featuresByRun,
  testCasesByFeature,
  testStepsByCase,
  entities,
  project,
})
