module Api
  module Runner
    class TestStepFinished
      attr_reader :test_run, :test_step

      def initialize(test_run, params)
        self.test_run = test_run
        self.params = params
      end

      def call
        test_case = test_run.test_cases.find_by!(test_case_hash: params[:test_case_hash])
        self.test_step = test_case.test_steps.find_by!(test_step_hash: params[:test_step_hash])

        test_step.status = params[:status]
        test_step.duration = params[:duration]
        test_step.save!

        notify_client
      end

      private

      attr_accessor :params
      attr_writer :test_run, :test_step

      def notify_client
        ActionCable.server.broadcast(LiveChannel::LIVE, {
          type: "TEST_STEP_FINISHED",
          data: test_step.as_json,
        })
      end
    end
  end
end
