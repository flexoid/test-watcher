module Api
  module Runner
    class TestCaseFinished
      attr_reader :test_run, :test_case

      def initialize(test_run, params)
        self.test_run = test_run
        self.params = params
      end

      def call
        self.test_case = find_test_case(params[:name])

        unless test_case
          Rails.logger.warn("Test case not found")
          return
        end

        test_case.status = params[:status]
        test_case.duration = params[:duration]
        test_case.save!
      end

      private

      attr_accessor :params
      attr_writer :test_run, :test_case

      def find_test_case(name)
        test_run.test_cases.find_by(name: name)
      end
    end
  end
end
