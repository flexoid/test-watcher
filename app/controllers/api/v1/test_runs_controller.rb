class Api::V1::TestRunsController < ApplicationController
  def index
    test_runs = TestRun.order(:id)
    render json: test_runs
  end

  def show
    test_run = TestRun.find(params[:id])
    render json: test_run
  end
end
