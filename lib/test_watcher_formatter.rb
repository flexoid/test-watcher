# frozen_string_literal: true

require "httparty"
require "securerandom"

require "cucumber/formatter/json"

class TestWatcherFormatter < Cucumber::Formatter::Json
  attr_accessor :test_run_uuid

  class << self
    attr_accessor :backend_url, :test_run_uuid
  end

  def initialize(config)
    @io = ensure_io(config.out_stream, config.error_stream)
    @ast_lookup = Cucumber::Formatter::AstLookup.new(config)
    @feature_hashes = []
    @step_or_hook_hash = {}

    config.on_event :test_case_started, &method(:on_test_case_started)
    config.on_event :test_case_finished, &method(:on_test_case_finished)
    config.on_event :test_step_started, &method(:on_test_step_started)
    config.on_event :test_step_finished, &method(:on_test_step_finished)
    # config.on_event :test_run_finished, &method(:on_test_run_finished)

    self.test_run_uuid = self.class.test_run_uuid || SecureRandom.uuid

    at_exit do
      if defined?(ParallelTests)
        if ParallelTests.first_process?
          ParallelTests.wait_for_other_processes_to_finish
          on_test_run_finished
        end
      else
        on_test_run_finished
      end
    end
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
      status: event.result.to_sym.to_s,
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
      properties: @step_hash,
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
    raise "`#{self.class}.backend_url` is not specified" unless backend_url

    HTTParty.post(
      "#{backend_url}/test_runs/#{test_run_uuid}#{endpoint}",
      body: body.to_json,
      headers: { "Content-Type" => "application/json" }
    )
  end

  def step_hash_string(test_case_hash, step_hash)
    Digest::MD5.hexdigest("#{test_case_hash[:id]}:#{step_hash[:line]}")
  end

  def backend_url
    self.class.backend_url
  end
end
