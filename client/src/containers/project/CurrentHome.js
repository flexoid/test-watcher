import React, { Component } from 'react';
import { connect } from 'react-redux'
import ProjectHome from "../../components/project/Home";

class ProjectCurrentHome extends Component {
  render() {
    return <ProjectHome {...this.props} />
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

ProjectCurrentHome = connect(
  mapStateToProps
)(ProjectCurrentHome)

export default ProjectCurrentHome
