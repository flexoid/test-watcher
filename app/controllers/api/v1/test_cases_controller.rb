class Api::V1::TestCasesController < ApplicationController
  before_action :set_feature, only: :index

  def index
    test_cases = feature.test_cases.order(:id)
    render json: test_cases
  end

  private

  attr_accessor :feature

  def set_feature
    self.feature = Feature.find(params[:feature_id])
  end
end
