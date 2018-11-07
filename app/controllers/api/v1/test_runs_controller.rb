class Api::V1::TestRunsController < ApplicationController
  before_action :set_project, only: [:index]

  def index
    test_runs = project.test_runs.order(id: :desc)
    render json: test_runs, each_serializer: TestRunCollectionSerializer
  end

  def show
    test_run = TestRun.find(params[:id])
    render json: test_run
  end

  private

  attr_accessor :project

  def set_project
    self.project = Project.find(params[:project_id])
  end
end
