class Api::V1::FeaturesController < ApplicationController
  before_action :set_test_run

  def index
    render json: test_run.features.order(:id)
  end

  private

  attr_accessor :test_run

  def set_test_run
    self.test_run = TestRun.find(params[:test_run_id])
  end
end
