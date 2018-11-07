import React, { Component } from 'react';
import { connect } from 'react-redux'
import TestRunLayout from "../../components/testRun/Layout"
import { fetchFeatures, fetchTestRun } from "../../actions"

const features = (testRunId, state) => {
  const featuresForCurrentRun = state.featuresByRun[testRunId]
  if (!featuresForCurrentRun) { return }

  const items = featuresForCurrentRun.items
    .map(featureId => state.entities.features[featureId])

  return { ...featuresForCurrentRun, items: items }
}

class TestRunCurrent extends Component {
  componentDidMount() {
    this.props.dispatch(fetchTestRun(this.props.testRunId))
    this.props.dispatch(fetchFeatures(this.props.testRunId))
  }

  render() {
    return <TestRunLayout {...this.props} />
  }
}

const mapStateToProps = (state, ownProps) => {
  let testRunId = parseInt(ownProps.match.params.testRunId, 10)

  return {
    testRunId: testRunId,
    testRun: state.entities.testRuns[testRunId],
    features: features(testRunId, state),
  }
}

TestRunCurrent = connect(
  mapStateToProps
)(TestRunCurrent)

export default TestRunCurrent
