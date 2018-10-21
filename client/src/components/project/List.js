import React, { Component } from 'react';
import { Link } from "react-router-dom";

class ProjectList extends Component {
  render() {
    return <div className="columns is-multiline">
      {this.props.projects.map(project =>
        <div key={project.id.toString()} className="column is-3">
          <div className="card">
            <header className="card-header">
              <p className="card-header-title">
                <Link to={`/projects/${project.id}`}>{project.name}</Link>
              </p>
            </header>
            <div className="card-content">
              <div className="content">
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  }
}

export default ProjectList
