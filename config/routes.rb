Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :test_runs, only: [:index, :show], shallow: true do
        resources :test_cases, only: [:index]
      end
    end
  end
end
