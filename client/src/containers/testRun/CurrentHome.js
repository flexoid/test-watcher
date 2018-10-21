import React, { Component } from 'react';
import { connect } from 'react-redux'
import TestRunHome from "../../components/testRun/Home"
import { fetchFeatures } from "../../actions"

const features = (testRunId, state) => {
  const featuresForCurrentRun = state.featuresByRun[testRunId]
  if (!featuresForCurrentRun) { return }

  const items = featuresForCurrentRun.items
    .map(featureId => state.entities.features[featureId])

  return { ...featuresForCurrentRun, items: items }
}

class CurrentTestRun extends Component {
  componentDidMount() {
    this.props.dispatch(fetchFeatures(this.props.testRunId))
  }

  render() {
    return <TestRunHome {...this.props} />
  }
}

const mapStateToProps = (state, ownProps) => {
  const testRunId = parseInt(ownProps.match.params.testRunId, 10)

  return {
    testRunId,
    testRun: state.entities.testRuns[testRunId],
    features: features(testRunId, state),
  }
}

CurrentTestRun = connect(
  mapStateToProps
)(CurrentTestRun)

export default CurrentTestRun
