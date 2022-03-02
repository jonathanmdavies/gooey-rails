Rails.application.routes.draw do
  devise_for :accounts, controllers: {
    sessions: 'accounts/sessions',
  }

  devise_scope :account do
    authenticated :account do
      root to: 'hello_world#index', as: :authenticated_account_root
      resources :feeds, only: [:create, :index, :destroy] do
        patch :refresh, on: :member
        resources :items, only: [:index]
        resources :unread, only: [:index, :show], module: 'feeds'
      end

      resources :unread, only: [:index], module: 'items'
      resources :items, only: [:index] do
        resource :read, only: [:create, :destroy]
      end
    end
  end

  unauthenticated do
    root 'accounts/sessions#new', as: :root
  end
end
