Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :test_runs, only: [:index, :show], shallow: true do
        resources :test_cases, only: [:index] do
          resources :test_steps, only: [:index]
        end
      end
    end

    namespace :runner do
      scope "/test_runs/:uuid" do
        post :test_run_finished, to: "test_runs#test_run_finished"
        post :test_case_started, to: "test_runs#test_case_started"
        post :test_case_finished, to: "test_runs#test_case_finished"
        post :test_step_started, to: "test_runs#test_step_started"
        post :test_step_finished, to: "test_runs#test_step_finished"
      end
    end

    namespace :ingest do
      scope "/:project_uuid/test_runs/:test_run_uuid" do
        post :test_runs, path: "", to: "test_runs#test_runs"
        post :test_cases, to: "test_runs#test_cases"
        post :test_steps, to: "test_runs#test_steps"
      end
    end
  end
end
