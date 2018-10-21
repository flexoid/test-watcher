import React, { Component } from 'react';
import TestCaseList from "../testCase/List"

class FeatureItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayCases: false,
    }

    this.toggleCases = this.toggleCases.bind(this)
  }

  render() {
    let feature = this.props.feature

    return (
      <div className="columns has-background-light">
        <div className="column is-12 level">
          <div className="level">
            <div className="level-left">
              <div className="level-item">
                <a onClick={this.toggleCases}>
                  <span className="icon"><i className="fa fa-list-alt"></i></span>
                </a>
              </div>
              <div className="level-item featureName">{feature.name}</div>
            </div>
          </div>

          {this.state.displayCases &&
            <TestCaseList testCases={this.props.testCases} />
          }
        </div>
      </div>
    );
  }

  toggleCases(e) {
    e.preventDefault()

    if (!this.state.displayCases) {
      this.props.fetchTestCases()
    }

    this.setState((state, props) => ({
      displayCases: !state.displayCases
    }))
  }
}

export default FeatureItem
