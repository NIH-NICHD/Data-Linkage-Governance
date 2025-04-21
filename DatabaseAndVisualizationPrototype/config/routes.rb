Rails.application.routes.draw do
  get 'vis', to: 'vis#index'
  get 'vis/*path', to: 'vis#index'
  get 'vis/glossary', to: 'vis#glossary'

    root "datasets#index"

    resources :datasets, only: [:index, :show] do
      collection do
        get :query
        get :all
      end
    end
end
