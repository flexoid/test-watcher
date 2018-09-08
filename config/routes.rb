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
        post :test_case_started, to: "test_runs#test_case_started"
        post :test_case_finished, to: "test_runs#test_case_finished"
        post :test_step_started, to: "test_runs#test_step_started"
        post :test_step_finished, to: "test_runs#test_step_finished"
      end
    end
  end
end
