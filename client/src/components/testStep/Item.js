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
      {step.name}
      {dataTable}
    </li>
  }
}

export default TestStep;
