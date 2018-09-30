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

        self.test_case = test_run.test_cases.find_by!(test_case_hash: params[:test_case_hash])

        self.test_step = test_case.test_steps.create!(
          test_step_hash: params[:test_step_hash],
          name: params[:name],
          properties: params[:properties]
        )

        notify_client
      end

      private

      attr_accessor :params, :test_case, :test_step
      attr_writer :test_run

      def notify_client
        ActionCable.server.broadcast(LiveChannel::LIVE, {
          type: "TEST_STEP_STARTED",
          testCaseId: test_case.id,
          data: test_step.as_json,
        })
      end
    end
  end
end
