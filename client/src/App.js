import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './Home';
import TestRun from './TestRun';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <nav className="navbar" aria-label="main navigation">
            <div className="navbar-brand">
              <div className="navbar-item">
                <b>Test Watcher App</b>
              </div>

              <Link to="/" className="navbar-item">Home</Link>
            </div>
          </nav>

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
