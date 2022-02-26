Rails.application.routes.draw do
  devise_for :accounts, controllers: {
    sessions: 'accounts/sessions',
  }

  devise_scope :account do
    authenticated :account do
      root to: 'hello_world#index', as: :authenticated_account_root
      resources :feeds, only: [:create, :index, :destroy]
    end
  end

  unauthenticated do
    root 'accounts/sessions#new', as: :root
  end
end
