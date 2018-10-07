module Api
  module Ingest
    class TestCaseHandler
      attr_reader :project, :params, :test_run, :feature, :test_case

      def initialize(project, params)
        self.project = project
        self.params = params
      end

      def call
        self.test_run = Api::Ingest::TestRunHandler
          .new(project, params[:test_run_uuid]).find_or_create

        self.feature = Api::Ingest::FeatureHandler.new(test_run, params).upsert

        process_test_case
      end

      private

      attr_writer :project, :params, :test_run, :feature, :test_case

      def process_test_case
        self.test_case = feature.test_cases
          .find_or_initialize_by(hash_id: params[:hash_id])

        test_case.name = params[:name] if params[:name].present?

        if params[:status].present?
          test_case.status = params[:status]
          test_case.finished_at = Time.current
        end

        test_case.save!
        notify_client
      end

      def notify_client
        ActionCable.server.broadcast(LiveChannel::LIVE, {
          type: "TEST_CASE_UPDATED",
          testRunId: test_run.id,
          featureId: feature.id,
          data: test_case.as_json,
        })
      end
    end
  end
end
