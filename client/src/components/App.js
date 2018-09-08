import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './Home';
import TestRun from './TestRun';
import Header from './Header'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />

          <section className="section">
            <div className="container">
              <Route exact path="/" component={Home} />
              <Route path="/runs/:testRunId" component={TestRun} />
            </div>
          </section>
        </div>
      </Router>
    );
  }
}

export default App;
