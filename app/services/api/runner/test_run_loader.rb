module Api
  module Runner
    class TestRunLoader
      attr_reader :test_run

      def find_or_create_test_run(uuid)
        retries ||= 0

        self.test_run = TestRun.find_by(uuid: uuid)
        return test_run if test_run

        self.test_run = TestRun.create!(uuid: uuid)
        notify_client(test_run)

        test_run
      rescue ActiveRecord::RecordNotUnique
        retries += 1
        retries > 1 ? raise : retry
      end

      private

      attr_writer :test_run

      def notify_client(test_run)
        ActionCable.server.broadcast(LiveChannel::LIVE, {
          type: "TEST_RUN_STARTED",
          data: test_run.as_json,
        })
      end
    end
  end
end
