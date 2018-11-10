class ProjectStats
  def initialize(project)
    self.project = project
  end

  def test_cases
    ActiveRecord::Base.connection.exec_query(<<-SQL)
      SELECT
        MIN(test_runs.created_at) as created_at,
        features.test_run_id,
        COUNT(CASE WHEN test_cases.status = 'passed' THEN 1 END) as passed,
        COUNT(CASE WHEN test_cases.status = 'failed' THEN 1 END) as failed
      FROM test_cases
      INNER JOIN features ON features.id = test_cases.feature_id
      INNER JOIN test_runs ON test_runs.id = features.test_run_id
      WHERE test_runs.project_id = #{project.id}
      GROUP BY test_runs.id
    SQL
  end

  private

  attr_accessor :project
end
