class Api::Runner::TestRunsController < ApplicationController
  before_action :set_test_run

  def test_case_started
    Api::Runner::TestCaseStarted.new(test_run, params.to_unsafe_h).call
  end

  def test_case_finished
    Api::Runner::TestCaseFinished.new(test_run, params.to_unsafe_h).call
  end

  def test_step_started
    Api::Runner::TestStepStarted.new(test_run, params.to_unsafe_h).call
  end

  def test_step_finished
    Api::Runner::TestStepFinished.new(test_run, params.to_unsafe_h).call
  end

  private

  def set_test_run
    self.test_run = Api::Runner::TestRunLoader.new
      .find_or_create_test_run(params[:uuid])
  end

  attr_accessor :test_run
end
