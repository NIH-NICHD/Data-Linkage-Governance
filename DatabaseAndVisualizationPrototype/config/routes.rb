Rails.application.routes.draw do

    root "datasets#index"

    resources :datasets, only: [:index, :show] do
      collection do
        get :query
        get :all
      end
    end
end
