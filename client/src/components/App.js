import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './Home';
import Header from './Header'
import ProjectCurrent from '../containers/project/Current'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <section className="section">
            <div className="container">
              <Route exact path="/" component={Home} />
              <Route path="/projects/:projectId" component={ProjectCurrent} />
            </div>
          </section>
        </div>
      </Router>
    );
  }
}

export default App;
