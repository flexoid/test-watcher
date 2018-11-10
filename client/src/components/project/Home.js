import React, { Component } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

class ProjectHome extends Component {
  render() {
    return <div className="columns">
      <div className="column is-12">
        <h2 className="subtitle">Test cases</h2>

        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={this.props.project.stats.test_cases}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}>

            <XAxis dataKey="test_run_id" hide={true} />
            <YAxis />
            <Tooltip
              labelFormatter={() => (undefined)}
              itemSorter={() => 1}
            />
            <Area type="monotone" dataKey="passed" fill="hsl(141, 71%, 48%)" stroke="hsl(141, 80%, 48%)" />
            <Area type="monotone" dataKey="failed" fill="hsl(348, 100%, 61%)" stroke="hsl(348, 100%, 65%)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  }
}

export default ProjectHome
