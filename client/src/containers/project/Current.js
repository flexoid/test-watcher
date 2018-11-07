import { connect } from 'react-redux'
import ProjectLayout from "../../components/project/Layout";

const mapStateToProps = (state, ownProps) => {
  let projectId = parseInt(ownProps.match.params.projectId, 10)

  return {
    projectId: projectId,
    project: state.entities.projects[projectId],
  }
}

const ProjectCurrent = connect(
  mapStateToProps
)(ProjectLayout)

export default ProjectCurrent
