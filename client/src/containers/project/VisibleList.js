import { connect } from 'react-redux'
import ProjectList from "../../components/project/List";

const mapStateToProps = state => {
  return {
    projects: Object.entries(state.entities.projects || {}).map(([id, project]) => project)
  }
}

const VisibleProjectList = connect(
  mapStateToProps
)(ProjectList)

export default VisibleProjectList
