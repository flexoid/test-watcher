import React, { Component } from 'react';
import axios from "axios";

class TestCase extends Component {
  constructor(props) {
    super(props);
    this.state = { showSteps: false, steps: [], stepsIsLoading: false }
  }

  async showSteps(e) {
    e.preventDefault();

    this.setState(state => {
      let stepsIsLoading = false

      if (!state.showSteps) {
        stepsIsLoading = true

        axios.get(`/api/v1/test_cases/${this.props.testCase.id}/test_steps`).then((response) => {
          this.setState({stepsIsLoading: false, steps: response.data})
        });
      }

      return {
        showSteps: !state.showSteps,
        stepsIsLoading: stepsIsLoading
      }
    })
  }

  render() {
    let stepsList;
    if (this.state.stepsIsLoading) {
      stepsList = <p>Loading...</p>
    } else if (this.state.showSteps) {
      stepsList =
        this.state.steps.map((step) => {
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
        <a href="#" onClick={this.showSteps.bind(this)}>{this.state.showSteps ? "Hide" : "Show"} steps</a>

        {stepsList}
      </li>
    );
  }
}

export default TestCase;
