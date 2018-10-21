module Api
  module Ingest
    class FeatureHandler
      attr_reader :test_run, :params, :feature

      def initialize(test_run, params)
        self.test_run = test_run
        self.params = params
      end

      def upsert
        retries ||= 0

        self.feature = test_run.features.where(hash_id: params[:feature_hash_id])
          .first_or_initialize

        feature.name = params[:feature_name] if params[:feature_name]

        feature.save!
        notify_client

        feature
      rescue ActiveRecord::RecordNotUnique
        retries += 1
        retries > 1 ? raise : retry
      end

      private

      attr_writer :test_run, :params, :feature

      def notify_client
        ActionCable.server.broadcast(LiveChannel::LIVE, {
          type: "FEATURE_UPDATED",
          testRunId: test_run.id,
          data: feature.as_json,
        })
      end
    end
  end
end
