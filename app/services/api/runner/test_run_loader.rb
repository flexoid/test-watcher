module Api
  module Runner
    class TestRunLoader
      def self.find_or_create_test_run(uuid)
        retries ||= 0

        test_run = TestRun.find_by(uuid: uuid)
        return test_run if test_run

        TestRun.create!(uuid: uuid)
      rescue ActiveRecord::RecordNotUnique
        retries += 1
        retries > 1 ? raise : retry
      end
    end
  end
end
