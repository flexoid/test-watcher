import { connect } from 'react-redux'
import TestRunHome from "../../components/testRun/Home"

const mapStateToProps = (state, ownProps) => {
  return {}
}

const CurrentTestRun = connect(
  mapStateToProps
)(TestRunHome)

export default CurrentTestRun
