import React, { Component } from 'react';
import { Link } from "react-router-dom";
import TestRuns from './TestRuns';

class Home extends Component {
  render() {
    return (
      <div className="Home columns">
        <TestRuns />
      </div>
    );
  }
}

export default Home;
