class Api::Ingest::TestRunsController < ApplicationController
  before_action :load_project

  def test_runs
    Api::Ingest::TestRunHandler.new(project, params[:test_run_uuid])
      .handle(params.to_unsafe_h)
  end

  def test_cases
    Api::Ingest::TestCaseHandler.new(project, params.to_unsafe_h).call
  end

  def test_steps
    Api::Ingest::TestStepHandler.new(project, params.to_unsafe_h).call
  end

  private

  attr_accessor :project

  def load_project
    self.project = Project.find_by!(uuid: params[:project_uuid])
  end
end
