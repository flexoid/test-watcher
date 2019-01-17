import React, { Component } from "react";
import Moment from "react-moment";

class TestStep extends Component {
  render() {
    const step = this.props.testStep;

    let dataTable;
    const rows = step.properties.rows;

    if (rows) {
      dataTable = rows.map((row, idx) => (
        <tr key={idx}>
          {row.cells.map((cell, cellIdx) => (
            <td key={cellIdx}>{cell}</td>
          ))}
        </tr>
      ));

      dataTable = (
        <table className="table is-bordered">
          <tbody>{dataTable}</tbody>
        </table>
      );
    }

    return (
      <li key={step.id}>
        <div className="columns is-gapless">
          <div className="column">{step.name}</div>
        </div>
        {dataTable && (
          <div className="columns is-gapless">
            <div className="column">{dataTable}</div>
          </div>
        )}
        <div className="columns is-gapless is-size-7">
          <div className="column">
            Started:{" "}
            <Moment format="YYYY-MM-DDTHH:mm:ss">{step.created_at}</Moment>
          </div>
          <div className="column">
            Finished:{" "}
            <Moment format="YYYY-MM-DDTHH:mm:ss">{step.finished_at}</Moment>
          </div>
        </div>
      </li>
    );
  }
}

export default TestStep;
