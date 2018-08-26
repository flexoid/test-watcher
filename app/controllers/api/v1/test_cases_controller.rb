class Api::V1::TestCasesController < ApplicationController
  before_action :set_test_run, only: :index

  def index
    test_cases = test_run.test_cases.order(:id)
    render json: test_cases
  end

  private

  attr_accessor :test_run

  def set_test_run
    self.test_run = TestRun.find(params[:test_run_id])
  end
end
