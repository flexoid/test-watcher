import React, { Component } from 'react';
import FeatureList from '../feature/List'

class TestRunFeatures extends Component {
  render() {
    const testRun = this.props.testRun
    const features = this.props.features

    if (!testRun || !features) {
      return <p>Loading...</p>
    }

    return <div className="columns">
      <div className="column is-12">
        <h2 className="subtitle">Features</h2>
        <FeatureList features={features} />
      </div>
    </div>
  }
}

export default TestRunFeatures
