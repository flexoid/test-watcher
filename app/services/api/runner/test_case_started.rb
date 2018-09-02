module Api
  module Runner
    class TestCaseStarted
      attr_reader :test_run

      def initialize(test_run, params)
        self.test_run = test_run
        self.params = params
      end

      def call
        test_run.test_cases.create!(name: params[:name])
      end

      private

      attr_accessor :params
      attr_writer :test_run
    end
  end
end
