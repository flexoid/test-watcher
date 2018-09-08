import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import moment from 'moment';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { testRuns: [] }
  }

  async componentDidMount() {
    const response = await axios.get("/api/v1/test_runs")
    this.setState({ testRuns: response.data });
  }

  render() {
    return (
      <ul>
        {this.state.testRuns.map(run =>
          <li key={run.id.toString()}>
            <p><Link to={`/runs/${run.id}`}>{run.id} {run.name}</Link></p>
            <p className="is-size-7">{moment(run.created_at).format()}</p>
          </li>
        )}
      </ul>
    );
  }
}

export default Home;
