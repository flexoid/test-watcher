import React, { Component } from 'react';
import TestStep from "./TestStep"

class TestCase extends Component {
  showSteps(e) {
    e.preventDefault()

    if (!this.isShowingSteps()) {
      this.props.fetchSteps()
    }

    this.props.toggleSteps()
  }

  stepsList() {
    if (!this.isShowingSteps()) {
      return null
    }

    if (!this.props.testSteps || this.props.testSteps.isFetching) {
      return <p>Loading...</p>
    }

    return <ul className="has-text-grey">
      {this.props.testSteps.items.map((step) =>
        <TestStep key={step.id} step={step} />
      )}
    </ul>
  }

  render() {
    return (
      <li>
        <p>{this.props.testCase.name}</p>
        <p className="is-size-7">{Math.round(this.props.testCase.duration)} sec</p>
        <p className="is-size-7">{this.props.testCase.status}</p>

        <a href="#toggle" onClick={this.showSteps.bind(this)}>
          {this.isShowingSteps() ? "Hide" : "Show"} steps
        </a>

        {this.stepsList()}
      </li>
    );
  }

  isShowingSteps() {
    return this.props.currentTestCase && this.props.currentTestCase.showSteps
  }
}

export default TestCase;
