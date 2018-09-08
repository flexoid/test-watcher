module Api
  module Runner
    class TestStepStarted
      attr_reader :test_run

      def initialize(test_run, params)
        self.test_run = test_run
        self.params = params
      end

      def call
        test_case_hash = params[:test_case_hash]
        test_case_hash = params[:test_step_hash]

        test_case = test_run.test_cases.find_by!(test_case_hash: params[:test_case_hash])

        test_case.test_steps.create!(
          test_step_hash: params[:test_step_hash],
          name: params[:name],
          properties: params[:properties]
        )
      end

      private

      attr_accessor :params
      attr_writer :test_run
    end
  end
end
