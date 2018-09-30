module Api
  module Runner
    class TestCaseStarted
      attr_reader :test_run

      def initialize(test_run, params)
        self.test_run = test_run
        self.params = params
      end

      def call
        self.test_case = test_run.test_cases
          .create!(test_case_hash: params[:test_case_hash], name: params[:name])

        notify_client
      end

      private

      attr_accessor :params, :test_case
      attr_writer :test_run

      def notify_client
        ActionCable.server.broadcast(LiveChannel::LIVE, {
          type: "TEST_CASE_STARTED",
          testRunId: test_run.id,
          data: test_case.as_json,
        })
      end
    end
  end
end
