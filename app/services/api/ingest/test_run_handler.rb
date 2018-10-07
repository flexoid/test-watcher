module Api
  module Ingest
    class TestRunHandler
      attr_reader :project, :uuid, :test_run

      def initialize(project, test_run_uuid)
        self.project = project
        self.uuid = test_run_uuid
      end

      def find_or_create
        retries ||= 0

        self.test_run = TestRun.find_by(uuid: uuid)
        return test_run if test_run

        self.test_run = project.test_runs.create!(uuid: uuid)
        notify_client

        test_run
      rescue ActiveRecord::RecordNotUnique
        retries += 1
        retries > 1 ? raise : retry
      end

      def handle(params)
        find_or_create

        if params[:status].present?
          test_run.finished_at = Time.current
          test_run.save!

          notify_client
        end
      end

      private

      attr_writer :project, :uuid, :test_run

      def notify_client
        ActionCable.server.broadcast(LiveChannel::LIVE, {
          type: "TEST_RUN_UPDATED",
          data: test_run.as_json,
        })
      end
    end
  end
end
