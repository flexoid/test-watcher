import React, { Component } from 'react';
import axios from "axios";

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

    const stepsList =
      this.props.testSteps.items.map((step) => {
        let table;
        const rows = step.properties.rows;

        if (rows) {
          table = rows.map((row, idx) => {
            return <tr key={idx}>
              {row.cells.map((cell, cellIdx) =>
                <td key={cellIdx}>{cell}</td>
              )}
            </tr>
          })
        }

        return <li key={step.id}>
          {step.name}

          {table &&
            <table className="table is-bordered">
              <tbody>{table}</tbody>
            </table>
          }
        </li>
      });

    return <ul className="has-text-grey">{stepsList}</ul>
  }

  render() {
    return (
      <li>
        <p>{this.props.testCase.name}</p>
        <p className="is-size-7">{this.props.testCase.duration} sec</p>
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
