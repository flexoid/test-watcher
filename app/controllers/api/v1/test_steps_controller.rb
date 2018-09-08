class Api::V1::TestStepsController < ApplicationController
  before_action :set_test_case, only: :index

  def index
    test_steps = test_case.test_steps.order(:id)
    render json: test_steps
  end

  private

  attr_accessor :test_case

  def set_test_case
    self.test_case = TestCase.find(params[:test_case_id])
  end
end
