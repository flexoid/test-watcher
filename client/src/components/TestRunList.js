import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux"
import axios from "axios";
import moment from 'moment';
import { setTodosList } from '../actions'

class TestRunList extends Component {
  async componentDidMount() {
    const response = await axios.get("/api/v1/test_runs")
    this.props.dispatch(setTodosList(response.data));
  }

  render() {
    return (
      <ul>
        {this.props.testRuns.all.map(run =>
          <li key={run.id.toString()}>
            <p><Link to={`/runs/${run.id}`}>{run.id} {run.name}</Link></p>
            <p className="is-size-7">{moment(run.created_at).format()}</p>
          </li>
        )}
      </ul>
    );
  }
}

export default connect(state => ({ testRuns: state.testRuns }))(TestRunList);
