Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :projects, only: [:index, :show], shallow: true do
        resources :test_runs, only: [:index, :show] do
          resources :features, only: [:index] do
            resources :test_cases, only: [:index] do
              resources :test_steps, only: [:index]
            end
          end
        end
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
