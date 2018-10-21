import { connect } from 'react-redux'
import FeatureItem from "../../components/feature/Item"
import { fetchTestCases } from "../../actions"

const testCases = (featureId, state) => {
  const testCasesByFeature = state.testCasesByFeature[featureId]
  if (!testCasesByFeature) { return }

  const items = testCasesByFeature.items
    .map((testCaseId) => state.entities.testCases[testCaseId])

  return { ...testCasesByFeature, items: items }
}

const mapStateToProps = (state, ownProps) => {
  return {
    testCases: testCases(ownProps.feature.id, state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchTestCases: () =>
      dispatch(fetchTestCases(ownProps.feature.id))
  }
}

const FeatureCurrentItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(FeatureItem)

export default FeatureCurrentItem
