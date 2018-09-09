import React, { Component } from 'react';
import axios from "axios";

class TestCase extends Component {
  showSteps(e) {
    e.preventDefault()
    this.props.toggleSteps()
  }

  render() {
    const showSteps = this.props.currentTestRun.testCases[this.props.testCase.id] &&
      this.props.currentTestRun.testCases[this.props.testCase.id].showSteps

    let stepsList;
    if (this.props.testSteps && this.props.testSteps.isFetching) {
      stepsList = <p>Loading...</p>
    } else if (showSteps) {
      stepsList =
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
      stepsList = <ul className="has-text-grey">{stepsList}</ul>
    }

    return (
      <li>
        <p>{this.props.testCase.name}</p>
        <p className="is-size-7">{this.props.testCase.duration} sec</p>
        <p className="is-size-7">{this.props.testCase.status}</p>
        <a href="#toggle" onClick={this.showSteps.bind(this)}>{showSteps ? "Hide" : "Show"} steps</a>

        {stepsList}
      </li>
    );
  }
}

export default TestCase;
