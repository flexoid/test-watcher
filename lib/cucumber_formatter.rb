require "httparty"
require "securerandom"

require "cucumber/formatter/json"

class TestWatcherFormatter < Cucumber::Formatter::Json
  attr_accessor :project_uuid, :test_run_uuid

  class << self
    attr_accessor :backend_url
  end

  def initialize(config)
    @feature_hashes = []
    @step_or_hook_hash = {}
    config.on_event :test_case_started, &method(:on_test_case_started)
    config.on_event :test_case_finished, &method(:on_test_case_finished)
    config.on_event :test_step_started, &method(:on_test_step_started)
    config.on_event :test_step_finished, &method(:on_test_step_finished)
    config.on_event :test_run_finished, &method(:on_test_run_finished)

    self.project_uuid = "78f46706-2157-4635-ad95-f8ea7fca56cb"
    self.test_run_uuid = SecureRandom.uuid
  end

  def on_test_case_started(event)
    super

    body = {
      feature_hash_id: Digest::MD5.hexdigest(current_feature[:id]),
      feature_name: current_feature[:name],
      hash_id: Digest::MD5.hexdigest(@test_case_hash[:id]),
      name: @test_case_hash[:name],
    }

    send_body(body, "/test_cases")
  end

  def on_test_case_finished(event)
    super

    body = {
      feature_hash_id: Digest::MD5.hexdigest(current_feature[:id]),
      hash_id: Digest::MD5.hexdigest(@test_case_hash[:id]),
      status: event.result.to_sym.to_s
    }

    send_body(body, "/test_cases")
  end

  def on_test_step_started(event)
    super
    return unless @step_hash

    body = {
      feature_hash_id: Digest::MD5.hexdigest(current_feature[:id]),
      test_case_hash_id: Digest::MD5.hexdigest(@test_case_hash[:id]),
      hash_id: step_hash_string(@test_case_hash, @step_hash),
      name: @step_hash[:name],
      properties: @step_hash
    }

    send_body(body, "/test_steps")
  end

  def on_test_step_finished(event)
    super
    return unless @step_hash

    body = {
      feature_hash_id: Digest::MD5.hexdigest(current_feature[:id]),
      test_case_hash_id: Digest::MD5.hexdigest(@test_case_hash[:id]),
      hash_id: step_hash_string(@test_case_hash, @step_hash),
      status: @step_hash[:result][:status].to_s,
    }

    send_body(body, "/test_steps")
  end

  def on_test_run_finished(event)
    send_body({ status: "finished" }, "")
  end

  private

  def send_body(body, endpoint)
    raise "`#{self.class}.backend_url` is not specified" unless self.class.backend_url

    HTTParty.post(
      "#{self.class.backend_url}/api/ingest/#{project_uuid}/test_runs/#{test_run_uuid}#{endpoint}",
      body: body.to_json,
      headers: { "Content-Type" => "application/json" }
    )

    # STDOUT.puts body.inspect
  end

  def step_hash_string(test_case_hash, step_hash)
    Digest::MD5.hexdigest("#{test_case_hash[:id]}:#{step_hash[:line]}")
  end
end

# class CustomFormatter
#   attr_reader :test_run_uuid

#   def initialize(config)
#     @test_run_uuid = SecureRandom.uuid

#     config.on_event(:test_case_started, &method(:test_case_started))
#     config.on_event(:test_case_finished, &method(:test_case_finished))
#     config.on_event(:test_step_started, &method(:test_step_started))
#     config.on_event(:test_step_finished, &method(:test_step_finished))
#   end

#   def test_case_started(event)
#     test_case = event.test_case
#     location = test_case.location

#     puts "Case started: #{test_case.name}"
#     puts "\tFile #{location.file}:#{location.line}\n"

#     body = {
#       name: test_case.name
#     }

#     HTTParty.post("http://localhost:31001/api/runner/test_runs/#{test_run_uuid}/test_case_started",
#       body: body)
#   end

#   def test_case_finished(event)
#     test_case = event.test_case
#     puts result_to_name(event.result)

#     body = {
#       name: test_case.name,
#       duration: test_case_duration_seconds(event.result),
#       status: status_to_report(event.result)
#     }

#     HTTParty.post("http://localhost:31001/api/runner/test_runs/#{test_run_uuid}/test_case_finished",
#       body: body)
#   end

#   def test_step_started(event)
#     step = event.test_step
#     location = step.location

#     binding.pry

#     puts "\tStep: #{step.text}"
#     puts "\t\tFile: #{location.file}:#{location.line}"
#   end

#   def test_step_finished(event)
#     puts result_to_name(event.result)
#   end

#   private

#   def result_to_name(result)
#     result.class.name.split("::").last
#   end

#   def status_to_report(result)
#     result_to_name(result).downcase
#   end

#   def test_case_duration_seconds(result)
#     result.duration.nanoseconds / 1_000_000_000.0
#   end
# end
