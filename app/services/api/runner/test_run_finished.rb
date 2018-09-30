module Api
  module Runner
    class TestRunFinished
      attr_reader :test_run

      def initialize(test_run, _params)
        self.test_run = test_run
      end

      def call
        test_run.update(finished_at: Time.zone.now)
        notify_client
      end

      private

      attr_writer :test_run

      def notify_client
        ActionCable.server.broadcast(LiveChannel::LIVE, {
          type: "TEST_RUN_FINISHED",
          data: test_run.as_json,
        })
      end
    end
  end
end
