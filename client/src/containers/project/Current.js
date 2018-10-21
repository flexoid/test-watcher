import React, { Component } from 'react';
import { connect } from 'react-redux'
import ProjectLayout from "../../components/project/Layout";
import { fetchTestRuns } from '../..//actions'

class ProjectCurrent extends Component {
  componentDidMount() {
    this.props.dispatch(fetchTestRuns(this.props.projectId))
  }

  render() {
    return <ProjectLayout {...this.props} />
  }
}

const mapStateToProps = (state, ownProps) => {
  let projectId = parseInt(ownProps.match.params.projectId, 10)

  return {
    projectId: projectId,
    project: state.entities.projects[projectId],
  }
}

ProjectCurrent = connect(
  mapStateToProps
)(ProjectCurrent)

export default ProjectCurrent
