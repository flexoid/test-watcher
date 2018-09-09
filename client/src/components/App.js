import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './Home';
import CurrentTestRun from '../containers/CurrentTestRun';
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
              <Route path="/runs/:testRunId" component={CurrentTestRun} />
            </div>
          </section>
        </div>
      </Router>
    );
  }
}

export default App;
