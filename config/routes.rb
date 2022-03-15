Rails.application.routes.draw do
  devise_for :accounts, controllers: {
    sessions: 'accounts/sessions',
  }

  devise_scope :account do
    authenticated :account do
      root to: 'items#index', as: :authenticated_account_root
      resources :feeds, only: [:create, :index, :destroy] do
        patch :refresh, on: :member
        resources :items, only: [:index, :show], module: 'feeds'
      end
      resources :items, only: [:index, :show]
    end
  end

  unauthenticated do
    root 'accounts/sessions#new', as: :root
  end
end
