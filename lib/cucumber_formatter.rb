require "httparty"
require "securerandom"

require "cucumber/formatter/json"

class TestWatcherFormatter < Cucumber::Formatter::Json
  def initialize(config)
    @feature_hashes = []
    @step_or_hook_hash = {}
    config.on_event :test_case_started, &method(:on_test_case_started)
    config.on_event :test_case_finished, &method(:on_test_case_finished)
    config.on_event :test_step_started, &method(:on_test_step_started)
    config.on_event :test_step_finished, &method(:on_test_step_finished)
    config.on_event :test_run_finished, &method(:on_test_run_finished)

    @test_run_uuid = SecureRandom.uuid
  end

  def on_test_case_started(event)
    super
    name = @test_case_hash[:name]

    body = {
      test_case_hash: Digest::MD5.hexdigest(name),
      name: name
    }

    send_body(body, "test_case_started")
  end

  def on_test_case_finished(event)
    super
    name = @test_case_hash[:name]

    body = {
      test_case_hash: Digest::MD5.hexdigest(name),
      duration: event.result.duration.nanoseconds / 1_000_000_000.0,
      status: event.result.to_sym.to_s
    }

    send_body(body, "test_case_finished")
  end

  def on_test_step_started(event)
    super
    return unless @step_hash

    test_case_name = @test_case_hash[:name]
    test_step_name = @step_hash[:name]

    body = {
      test_case_hash: Digest::MD5.hexdigest(test_case_name),
      test_step_hash: step_hash_string(@step_hash),
      name: test_step_name,
      properties: @step_hash
    }

    send_body(body, "test_step_started")
  end

  def on_test_step_finished(event)
    super
    return unless @step_hash

    test_case_name = @test_case_hash[:name]
    test_step_name = @step_hash[:name]

    body = {
      test_case_hash: Digest::MD5.hexdigest(test_case_name),
      test_step_hash: step_hash_string(@step_hash),
      duration: @step_hash[:result][:duration] / 1_000_000_000.0,
      status: @step_hash[:result][:status].to_s
    }

    send_body(body, "test_step_finished")
  end

  def on_test_run_finished(event)
    send_body({}, "test_run_finished")
  end

  private

  def send_body(body, endpoint)
    HTTParty.post(
      "http://localhost:31001/api/runner/test_runs/#{@test_run_uuid}/#{endpoint}",
      body: body.to_json,
      headers: { "Content-Type" => "application/json" }
    )

    STDOUT.puts body.inspect
  end

  def step_hash_string(step_hash)
    Digest::MD5.hexdigest("#{@step_hash[:name]}:#{@step_hash[:line]}")
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
