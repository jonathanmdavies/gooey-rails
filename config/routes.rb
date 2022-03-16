Rails.application.routes.draw do
  devise_for :accounts, controllers: {
    sessions: 'accounts/sessions',
  }

  devise_scope :account do
    authenticated :account do
      root to: 'read/items#index', as: :authenticated_account_root

      scope module: 'manage', path: 'manage' do
        resources :feeds, only: [:create, :index, :destroy] do
          patch :refresh, on: :member
        end
      end

      scope module: 'read' do
        resources :feeds, only: [] do
          resources :items, only: [:index, :show], module: :feeds
        end
        resources :items, only: [:index, :show] do
          resource :read, only: [:create, :destroy]
        end
      end
    end
  end

  unauthenticated do
    root 'accounts/sessions#new', as: :root
  end
end
