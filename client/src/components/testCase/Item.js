import React, { Component } from 'react';
import TestStepItem from "../testStep/Item"

class TestCaseList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displaySteps: false,
    }

    this.toggleSteps = this.toggleSteps.bind(this)
  }

  render() {
    let testCase = this.props.testCase

    return <div className="level">
      <div className="level-left">
        <div className="level-item">
          <a onClick={this.toggleSteps}>
            <span className="icon"><i className="fa fa-check"></i></span>
          </a>
        </div>
        <div className="level-item">{testCase.name}</div>
      </div>
      <div className="level-right">
        <div className="level-item">
          {this.status(testCase)}
        </div>

        {this.isFinished(testCase) &&
          <div className="level-item">
            <p className="is-size-7">{this.duration(testCase)} sec</p>
          </div>
        }
      </div>

      <div className={"testCasesModal modal" + (this.state.displaySteps ? " is-active" : "")}>
        <div className="modal-background" onClick={this.toggleSteps}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{testCase.name}</p>
            <button onClick={this.toggleSteps} className="delete" aria-label="close"></button>
          </header>
          <section className="modal-card-body content">
            <ul>
              {(this.props.testSteps && !this.props.testSteps.isLoading) ? (
                this.props.testSteps.items.map(testStep =>
                  <TestStepItem key={testStep.id.toString()} testStep={testStep} />
                )
              ) : (
                <p>Loading...</p>
              )}
            </ul>
          </section>
        </div>
      </div>
    </div>
  }

  toggleSteps(e) {
    e.preventDefault()

    if (!this.state.displaySteps) {
      this.props.fetchTestSteps()
    }

    this.setState((state, props) => ({
      displaySteps: !state.displaySteps
    }))
  }

  duration(testCase) {
    let createdAt = new Date(testCase.created_at)
    let finishedAt = new Date(testCase.finished_at)

    return Math.round((finishedAt - createdAt) / 1000)
  }

  status(testCase) {
    let status = testCase.status
    let statusClass

    if (testCase.status === "passed") {
      statusClass = "has-text-success"
    } else if (testCase.status === "failed") {
      statusClass = "has-text-danger"
    } else {
      statusClass = "has-text-info"
      status = "pending"
    }
    return <p className={"is-size-7 " + (statusClass)}>{status}</p>
  }

  isFinished(testCase) {
    return !!testCase.finished_at
  }
}

export default TestCaseList
