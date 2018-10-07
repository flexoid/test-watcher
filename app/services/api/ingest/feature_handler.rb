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

        feature
      rescue ActiveRecord::RecordNotUnique
        retries += 1
        retries > 1 ? raise : retry
      end

      private

      attr_writer :test_run, :params, :feature
    end
  end
end
