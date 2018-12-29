import React, { Component } from 'react';

class TestStep extends Component {
  render() {
    const step = this.props.testStep

    let dataTable;
    const rows = step.properties.rows;

    if (rows) {
      dataTable = rows.map((row, idx) =>
        <tr key={idx}>
          {row.cells.map((cell, cellIdx) =>
            <td key={cellIdx}>{cell}</td>
          )}
        </tr>
      )

      dataTable = <table className="table is-bordered">
        <tbody>{dataTable}</tbody>
      </table>
    }

    return <li key={step.id}>
      <div className="columns is-gapless">
        <div className="column">{step.name}</div>
      </div>
      {dataTable && <div className="columns is-gapless">
        <div className="column">{dataTable}</div>
      </div>}
      <div className="columns is-gapless is-size-7">
        <div className="column">Started: {step.created_at}</div>
        <div className="column">Finished: {step.finished_at}</div>
      </div>
    </li>
  }
}

export default TestStep;
