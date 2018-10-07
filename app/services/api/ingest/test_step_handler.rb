module Api
  module Ingest
    class TestStepHandler
      attr_reader :project, :params, :test_run, :feature, :test_case, :test_step

      def initialize(project, params)
        self.project = project
        self.params = params
      end

      def call
        load_test_run
        load_feature
        load_test_case

        process_test_case
      end

      private

      attr_writer :project, :params, :test_run, :feature, :test_case, :test_step

      def load_test_run
        self.test_run = Api::Ingest::TestRunHandler
          .new(project, params[:test_run_uuid]).find_or_create
      end

      def load_feature
        self.feature = test_run.features.find_by!(hash_id: params[:feature_hash_id])
      end

      def load_test_case
        self.test_case = feature.test_cases.find_by!(hash_id: params[:test_case_hash_id])
      end

      def process_test_case
        self.test_step = test_case.test_steps
          .find_or_initialize_by(hash_id: params[:hash_id])

        test_step.name = params[:name] if params[:name].present?
        test_step.properties = params[:properties] if params[:properties].present?

        if params[:status].present?
          test_step.status = params[:status]
          test_step.finished_at = Time.current
        end

        test_step.save!

        notify_client
      end

      def notify_client
        ActionCable.server.broadcast(LiveChannel::LIVE, {
          type: "TEST_STEP_UPDATED",
          testCaseId: test_case.id,
          data: test_step.as_json,
        })
      end
    end
  end
end
